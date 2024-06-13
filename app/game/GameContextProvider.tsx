import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Grid, Player } from "../constants/GameOptions";
import {
  Difficulty,
  GameTheme,
  GridSize,
  roundTimeMap,
} from "../constants/MenuOptions";
import { generateGrid } from "../utils/gridGenerator";
import { generatePlayers } from "../utils/playersGenerator";
import soundService from "../services/SoundService";
import { sounds } from "../constants/sounds";

// Define constants
export const turnTime = 7;
const HIDE_DELAY = 1500;

// Define the context type for players
interface PlayerContextType {
  players: Player[];
  sortedPlayers: Player[];
  currentTurn: number;
  moves: number;
}

// Create the Player context with an initial empty value
export const PlayerContext = createContext<PlayerContextType>(
  {} as PlayerContextType
);

// Define the context type for the timer
interface TimerContextType {
  timeLeft: number;
  currentTurnTimeLeft: number;
  getRoundTime: () => number;
}

// Create the Timer context with an initial empty value
export const TimerContext = createContext<TimerContextType>(
  {} as TimerContextType
);

// Define the context type for the grid
interface GridContextType {
  grid: Grid;
  isSelected: (i: number, j: number) => boolean;
  gameNumberClicked: (i: number, j: number) => void;
}

// Create the Grid context with an initial empty value
export const GridContext = createContext<GridContextType>(
  {} as GridContextType
);

// Define the context type for the game state
interface GameStateContextType {
  restartGame: () => void;
}

// Create the GameState context with an initial empty value
export const GameStateContext = createContext<GameStateContextType>(
  {} as GameStateContextType
);

// Props interface for GameContextProvider
interface Props {
  playersNumber: number;
  gridSize: number;
  theme: GameTheme;
  difficulty?: Difficulty;
  children: ReactNode;
}

// GameContextProvider component
const GameContextProvider = ({
  playersNumber,
  gridSize,
  theme,
  difficulty = Difficulty.EASY,
  children,
}: Props) => {
  // State management for players
  const [players, setPlayers] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [moves, setMoves] = useState(0);

  // State management for timers
  const [timeLeft, setTimeLeft] = useState(getRoundTime());
  const [currentTurnTimeLeft, setCurrentTurnTimeLeft] = useState(turnTime);

  // State management for the grid
  const [grid, setGrid] = useState<Grid>([]);
  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);

  // Timeout management
  const [clearAllSelectionsTimeOut, setClearAllSelectionsTimeOut] =
    useState<NodeJS.Timeout | null>(null);
  const [timeLeftTimeOut, setTimeLeftTimeOut] = useState<NodeJS.Timeout | null>(
    null
  );
  const [currentTurnTimeLeftTimeOut, setCurrentTurnTimeLeftTimeOut] =
    useState<NodeJS.Timeout | null>(null);

  // Generate players when the number of players changes
  useEffect(() => {
    const generatedPlayers = generatePlayers(playersNumber);
    setPlayers(generatedPlayers);
  }, [playersNumber]);

  // Sort players by score whenever the players array changes
  useEffect(() => {
    const sortedPlayersTemp = [...players].sort((a, b) => b.score - a.score);
    setSortedPlayers(sortedPlayersTemp);
  }, [players]);

  // Generate the grid when gridSize or theme changes
  useEffect(() => {
    const generatedGrid = generateGrid(gridSize, theme);
    setGrid(generatedGrid);
  }, [gridSize, theme]);

  // Handle card selection and moves
  useEffect(() => {
    if ((firstSelection || secondSelection) && !checkCorrect()) {
      soundService.play(sounds["Card Flip"]);
    }

    if (!firstSelection || !secondSelection) return;
    setMoves(moves + 1);
    if (checkCorrect()) handleRight();
    else handleWrong();
  }, [firstSelection, secondSelection]);

  // Manage the main timer
  useEffect(() => {
    if (players.length > 1) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft - 1 == 0 && players.length == 1) {
          endGame();
        }
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    setTimeLeftTimeOut(timer);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Manage the turn timer
  useEffect(() => {
    if (players.length == 1) return;
    const timer = setInterval(() => {
      setCurrentTurnTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0.3 && players.length != 1) {
          nextTurn();
          return turnTime;
        }
        return prevTimeLeft - 0.1;
      });
    }, 100);
    setCurrentTurnTimeLeftTimeOut(timer);

    return () => clearInterval(timer);
  }, [currentTurn]);

  // Handle game number click
  const gameNumberClicked = (i: number, j: number) => {
    if (grid[i][j].flipped) return;
    if (firstSelection && secondSelection && checkCorrect()) {
      setSecondSelection(null);
      setFirstSelection([i, j]);
      setFlipped(i, j, true);
      clearTimeout(clearAllSelectionsTimeOut!);
      setClearAllSelectionsTimeOut(null);
      return;
    }

    if (!firstSelection) {
      setFirstSelection([i, j]);
      setFlipped(i, j, true);
    } else if (!secondSelection) {
      setSecondSelection([i, j]);
      setFlipped(i, j, true);
    }
  };

  // Set card flipped state
  const setFlipped = (i: number, j: number, flipped: boolean) => {
    setGrid((prevGrid) => {
      prevGrid[i][j].flipped = flipped;
      return prevGrid;
    });
  };

  // Handle correct selection
  const handleRight = () => {
    soundService.play(sounds.Correct);
    increaseCurrentPlayerScore();
    setCurrentTurnTimeLeft(turnTime);
    if (checkGameOver()) {
      clearAllSelections(0);
      endGame();
    } else {
      clearAllSelections();
    }
  };

  // Handle wrong selection
  const handleWrong = () => {
    if (!firstSelection || !secondSelection) return;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    clearTimeout(currentTurnTimeLeftTimeOut!);
    setTimeout(() => {
      setFlipped(row1, col1, false);
      setFlipped(row2, col2, false);
      clearAllSelections(0);
      nextTurn();
    }, HIDE_DELAY);
  };

  // Check if the game is over
  const checkGameOver = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (!grid[i][j].flipped) return false;
      }
    }
    return true;
  };

  // Check if the selected cards are correct
  const checkCorrect = () => {
    if (!firstSelection || !secondSelection) return false;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    return grid[row1][col1].value === grid[row2][col2].value;
  };

  // Check if a card is selected
  const isSelected = (i: number, j: number) => {
    if (!firstSelection && !secondSelection) return false;
    if (firstSelection) {
      const [row1, col1] = firstSelection;
      if (row1 === i && col1 === j) return true;
    }
    if (secondSelection) {
      const [row2, col2] = secondSelection;
      return row2 === i && col2 === j;
    }
    return false;
  };

  // Clear all selections
  const clearAllSelections = (delay: number = HIDE_DELAY) => {
    const timeOut = setTimeout(() => {
      setFirstSelection(null);
      setSecondSelection(null);
    }, delay);
    setClearAllSelectionsTimeOut(timeOut);
  };

  // Restart the players
  const restartPlayers = () => {
    const generatedPlayers = generatePlayers(playersNumber);
    setPlayers(generatedPlayers);
    setCurrentTurn(0);
    setMoves(0);
  };

  // Restart the grid
  const restartGrid = () => {
    const generatedGrid = generateGrid(gridSize, theme);
    setGrid(generatedGrid);
    setFirstSelection(null);
    setSecondSelection(null);
    if (clearAllSelectionsTimeOut) clearTimeout(clearAllSelectionsTimeOut);
    setClearAllSelectionsTimeOut(null);
  };

  // Restart the timer
  const restartTimer = () => {
    setTimeLeft(getRoundTime()); // Reset to initial time value
    setCurrentTurnTimeLeft(turnTime); // Reset to initial turn time
  };

  // Get Round Time
  function getRoundTime() {
    return roundTimeMap[gridSize as GridSize][difficulty];
  }

  // End the game
  const endGame = () => {
    const event = new Event("gameEnd");
    window.dispatchEvent(event); // Dispatch a custom event indicating game end
    clearInterval(timeLeftTimeOut!);
    clearInterval(currentTurnTimeLeftTimeOut!);
  };

  // Move to the next turn
  const nextTurn = () => {
    setCurrentTurn((currentTurn + 1) % playersNumber); // Move to the next player's turn
    setCurrentTurnTimeLeft(turnTime); // Reset the turn timer
  };

  // Increase the current player's score
  const increaseCurrentPlayerScore = () => {
    players[currentTurn].score++;
    setPlayers([...players]); // Update the players state with the new score
  };

  // Restart the game by resetting grid, timer, and players
  const restartGame = () => {
    restartGrid();
    restartTimer();
    restartPlayers();
  };

  return (
    <GridContext.Provider
      value={{
        grid,
        gameNumberClicked,
        isSelected,
      }}
    >
      <TimerContext.Provider
        value={{
          timeLeft,
          currentTurnTimeLeft,
          getRoundTime,
        }}
      >
        <PlayerContext.Provider
          value={{
            currentTurn,
            moves,
            players,
            sortedPlayers,
          }}
        >
          <GameStateContext.Provider value={{ restartGame }}>
            {children}
          </GameStateContext.Provider>
        </PlayerContext.Provider>
      </TimerContext.Provider>
    </GridContext.Provider>
  );
};

export default GameContextProvider;
