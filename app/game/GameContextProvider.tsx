import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Grid, Player } from "../constants/GameOptions";
import { GameTheme } from "../constants/MenuOptions";
import { generateGrid } from "../utils/gridGenerator";
import { generatePlayers } from "../utils/playersGenerator";
import soundService from "../services/SoundService";
import { sounds } from "../constants/sounds";

interface PlayerContextType {
  players: Player[];
  sortedPlayers: Player[];
  currentTurn: number;
  moves: number;
}

export const PlayerContext = createContext<PlayerContextType>(
  {} as PlayerContextType
);

interface TimerContextType {
  timeLeft: number;
  currentTurnTimeLeft: number;
}

export const TimerContext = createContext<TimerContextType>(
  {} as TimerContextType
);

interface GridContextType {
  grid: Grid;
  isSelected: (i: number, j: number) => boolean;
  gameNumberClicked: (i: number, j: number) => void;
}

export const GridContext = createContext<GridContextType>(
  {} as GridContextType
);

interface GameStateContextType {
  restartGame: () => void;
}

export const GameStateContext = createContext<GameStateContextType>(
  {} as GameStateContextType
);

interface Props {
  playersNumber: number;
  gridSize: number;
  theme: GameTheme;
  children: ReactNode;
}

export const turnTime = 7;
export const soloRoundTime = 120;
const HIDE_DELAY = 1500;

const GameContextProvider = ({
  playersNumber,
  gridSize,
  theme,
  children,
}: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(soloRoundTime);
  const [currentTurnTimeLeft, setCurrentTurnTimeLeft] = useState(turnTime);
  const [grid, setGrid] = useState<Grid>([]);
  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);
  const [clearAllSelectionsTimeOut, setClearAllSelectionsTimeOut] =
    useState<NodeJS.Timeout | null>(null);
  const [timeLeftTimeOut, setTimeLeftTimeOut] = useState<NodeJS.Timeout | null>(
    null
  );
  const [currentTurnTimeLeftTimeOut, setCurrentTurnTimeLeftTimeOut] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generatedPlayers = generatePlayers(playersNumber);
    setPlayers(generatedPlayers);
  }, [playersNumber]);

  useEffect(() => {
    const sortedPlayersTemp = [...players].sort((a, b) => b.score - a.score);
    setSortedPlayers(sortedPlayersTemp);
  }, [players]);

  useEffect(() => {
    const generatedGrid = generateGrid(gridSize, theme);
    setGrid(generatedGrid);
  }, [gridSize, theme]);

  useEffect(() => {
    if ((firstSelection || secondSelection) && !checkCorrect())
      soundService.play(sounds["Card Flip"]);

    if (!firstSelection || !secondSelection) return;
    setMoves(moves + 1);
    if (checkCorrect()) handleRight();
    else handleWrong();
  }, [firstSelection, secondSelection]);

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

  const setFlipped = (i: number, j: number, flipped: boolean) => {
    setGrid((prevGrid) => {
      prevGrid[i][j].flipped = flipped;
      return prevGrid;
    });
  };

  const handleRight = () => {
    soundService.play(sounds.Correct);
    increaseCurrentPlayerScore();
    if (checkGameOver()) {
      clearAllSelections(0);
      endGame();
    } else clearAllSelections();
  };

  const handleWrong = () => {
    if (!firstSelection || !secondSelection) return;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    setTimeout(() => {
      setFlipped(row1, col1, false);
      setFlipped(row2, col2, false);
      clearAllSelections(0);
      nextTurn();
    }, HIDE_DELAY);
  };

  const checkGameOver = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++)
        if (!grid[i][j].flipped) return false;
    }
    return true;
  };

  const checkCorrect = () => {
    if (!firstSelection || !secondSelection) return false;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    return grid[row1][col1].value === grid[row2][col2].value;
  };

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

  const clearAllSelections = (delay: number = HIDE_DELAY) => {
    const timeOut = setTimeout(() => {
      setFirstSelection(null);
      setSecondSelection(null);
    }, delay);
    setClearAllSelectionsTimeOut(timeOut);
  };

  const restartPlayers = () => {
    const generatedPlayers = generatePlayers(playersNumber);
    setPlayers(generatedPlayers);
    setCurrentTurn(0);
    setMoves(0);
  };

  const restartGrid = () => {
    const generatedGrid = generateGrid(gridSize, theme);
    setGrid(generatedGrid);
    setFirstSelection(null);
    setSecondSelection(null);
    if (clearAllSelectionsTimeOut) clearTimeout(clearAllSelectionsTimeOut);
    setClearAllSelectionsTimeOut(null);
  };

  const restartTimer = () => {
    setTimeLeft(soloRoundTime);
    setCurrentTurnTimeLeft(turnTime);
  };

  const endGame = () => {
    const event = new Event("gameEnd");
    window.dispatchEvent(event);
    clearInterval(timeLeftTimeOut!);
    clearInterval(currentTurnTimeLeftTimeOut!);
  };

  const nextTurn = () => {
    setCurrentTurn((currentTurn + 1) % playersNumber);
  };

  const increaseCurrentPlayerScore = () => {
    players[currentTurn].score++;
    setPlayers([...players]);
  };

  // Restart game
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
