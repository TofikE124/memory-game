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
  currentTurn: number;
  firstSelection: [number, number] | null;
  secondSelection: [number, number] | null;
  isSelected: (i: number, j: number) => boolean;
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
  const [totalScore, setTotalScore] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);
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

  // Handle Selection Change
  useEffect(() => {
    if (checkCorrect()) handleRight();
    else handleWrong();
  }, [secondSelection]);

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
    increaseTotalScore();
    clearAllSelections();
    if (checkGameOver()) console.log("game over");
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

  // Increase the total score
  const increaseTotalScore = () => {
    setTotalScore(totalScore + 1);
  };

  // Check if the game is over
  const checkGameOver = () => {
    return totalScore === (gridSize * gridSize) / 2;
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
  const clearAllSelections = () => {
    const timeOut = setTimeout(() => {
      setFirstSelection(null);
      setSecondSelection(null);
    }, HIDE_DELAY);
    setClearAllSelectionsTimeOut(timeOut);
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        gameNumberClicked,
        players,
        currentTurn,
        firstSelection,
        secondSelection,
        isSelected,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
