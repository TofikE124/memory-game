"use effect";
import { createContext, ReactNode, useEffect, useState } from "react";
import { GameTheme, GridType } from "../constants/GameOptions";
import { generateGrid } from "../utils/gridGenerator";

interface GameContextType {
  grid: GridType;
  gameNumberClicked: (i: number, j: number) => void;
}

export const GameContext = createContext<GameContextType>(
  {} as GameContextType
);

interface Props {
  theme: GameTheme;
  playersNumber?: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
  children: ReactNode;
}

const GameContextProvider = ({
  gridSize,
  theme,
  playersNumber,
  children,
}: Props) => {
  const [grid, setGrid] = useState<GridType>([]);
  // Grid Intialization
  useEffect(() => {
    const generatedGrid = generateGrid(parseInt(gridSize), theme);
    setGrid(generatedGrid);
  }, [gridSize, theme]);

  // Selection Initialization
  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);

  // Handle Selection Change
  useEffect(() => {
    if (!firstSelection || !secondSelection) return;

    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;

    const HIDE_DELAY = 2000;

    if (grid[row1][col1].value == grid[row2][col2].value) {
      console.log("Congrats");
      setFirstSelection(null);
      setSecondSelection(null);
    } else {
      setTimeout(() => {
        setFlipped(row1, col1, false);
        setFlipped(row2, col2, false);
        setFirstSelection(null);
        setSecondSelection(null);
      }, HIDE_DELAY);
    }
  }, [secondSelection]);

  // Functions
  const gameNumberClicked = (i: number, j: number) => {
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

  return (
    <GameContext.Provider value={{ grid, gameNumberClicked }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
