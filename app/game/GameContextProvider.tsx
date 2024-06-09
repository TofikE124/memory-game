"use effect";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Grid, Player } from "../constants/GameOptions";
import { GameTheme } from "../constants/MenuOptions";
import { generateGrid } from "../utils/gridGenerator";
import { generatePlayers } from "../utils/playersGenerator";

// Define the context type
interface GameContextType {
  grid: Grid;
  gameNumberClicked: (i: number, j: number) => void;
  players: Player[];
  sortedPlayers: Player[];
  currentTurn: number;
  firstSelection: [number, number] | null;
  secondSelection: [number, number] | null;
  isSelected: (i: number, j: number) => boolean;
  restartGame: () => void;
  moves: number;
  timeLeft: number;
}

// Create the context
export const GameContext = createContext<GameContextType>(
  {} as GameContextType
);

// Define the props for the provider
interface Props {
  theme: GameTheme;
  playersNumber: number;
  gridSize: number;
  children: ReactNode;
}

const GameContextProvider = ({
  gridSize,
  theme,
  playersNumber,
  children,
}: Props) => {
  const HIDE_DELAY = 1500;

  // State Initialization
  const [grid, setGrid] = useState<Grid>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [timeLeftTimeOut, setTimeLeftTimeOut] = useState<NodeJS.Timeout | null>(
    null
  );

  const [clearAllSelectionsTimeOut, setClearAllSelectionsTimeOut] =
    useState<NodeJS.Timeout | null>(null);

  // Grid Initialization
  useEffect(() => {
    const generatedGrid = generateGrid(gridSize, theme);
    setGrid(generatedGrid);
  }, [gridSize, theme]);

  // Players Initialization
  useEffect(() => {
    const generatedPlayers = generatePlayers(playersNumber);
    setPlayers(generatedPlayers);
  }, [playersNumber]);

  useEffect(() => {
    setSortedPlayers(players.sort((a, b) => b.score - a.score));
  }, [players]);

  // Timer Intitialization
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

  // Handle Selection Change
  useEffect(() => {
    if (!firstSelection || !secondSelection) return;
    if (checkCorrect()) handleRight();
    else handleWrong();
    setMoves(moves + 1);
  }, [firstSelection, secondSelection]);

  // Handle a number click in the grid
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

  // Set the flipped state of a cell in the grid
  const setFlipped = (i: number, j: number, flipped: boolean) => {
    setGrid((prevGrid) => {
      prevGrid[i][j].flipped = flipped;
      return prevGrid;
    });
  };

  // Handle a correct match
  const handleRight = () => {
    increaseCurrentPlayerScore();
    if (checkGameOver()) {
      clearAllSelections(0);
      endGame();
    } else clearAllSelections();
  };

  // Handle an incorrect match
  const handleWrong = () => {
    if (!firstSelection || !secondSelection) return;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    setTimeout(() => {
      setFlipped(row1, col1, false);
      setFlipped(row2, col2, false);
      setFirstSelection(null);
      setSecondSelection(null);
      setCurrentTurn((prevTurn) => (prevTurn + 1) % playersNumber);
    }, HIDE_DELAY);
  };

  // Increase the score of the current player
  const increaseCurrentPlayerScore = () => {
    players[currentTurn].score++;
    setPlayers(players);
  };

  // Check if the game is over
  const checkGameOver = () => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) if (!grid[i][j].flipped) return false;
    }
    return true;
  };

  // Handle end game
  const endGame = () => {
    fireGameEndEvent(); // Fire the custom event when the game ends
    clearTimeout(timeLeftTimeOut!);
  };

  // Check if the selected cells match
  const checkCorrect = () => {
    if (!firstSelection || !secondSelection) return false;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    return grid[row1][col1].value === grid[row2][col2].value;
  };

  // Check if a cell is selected
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

  // Fire a custom game end event
  const fireGameEndEvent = () => {
    const event = new Event("gameEnd");
    window.dispatchEvent(event);
  };

  // Get Players sorted by Score
  const getSortedPlayers = () => {
    return [...players].sort((a, b) => b.score - a.score);
  };

  // Restart Game
  const restartGame = () => {
    const generatedPlayers = generatePlayers(playersNumber);
    const generatedGrid = generateGrid(gridSize, theme);
    setPlayers(generatedPlayers);
    setGrid(generatedGrid);
    setCurrentTurn(0);
    setFirstSelection(null);
    setSecondSelection(null);
    if (clearAllSelectionsTimeOut) clearTimeout(clearAllSelectionsTimeOut);
    setClearAllSelectionsTimeOut(null);
    setMoves(0);
    setTimeLeftTimeOut(null);
    setTimeLeft(120);
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        gameNumberClicked,
        players,
        sortedPlayers,
        currentTurn,
        firstSelection,
        secondSelection,
        isSelected,
        restartGame,
        moves,
        timeLeft,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
