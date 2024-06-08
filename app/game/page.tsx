"use client";
import { useEffect, useState } from "react";
import {
  GameProps,
  GameTheme,
  GridSize,
  GridType,
} from "../constants/GameOptions";
import GameHeader from "./GameHeader";
import { generateGrid } from "../utils/gridGenerator";
import GameNumber from "./GameNumber";

interface SearchParams {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
}

interface Props {
  searchParams: SearchParams;
}

const page = ({ searchParams: { gridSize, playersNumber, theme } }: Props) => {
  const [grid, setGrid] = useState<GridType>([]);

  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    const generatedGrid = generateGrid(parseInt(gridSize), theme);
    setGrid(generatedGrid);
  }, [gridSize, theme]);

  const gameNumberClicked = (i: number, j: number) => {
    if (!firstSelection) {
      setFirstSelection([i, j]);
      setFlipped(i, j, true);
    } else if (!secondSelection) {
      setSecondSelection([i, j]);
      setFlipped(i, j, true);
    }
  };

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

  const setFlipped = (i: number, j: number, flipped: boolean) => {
    setGrid((prevGrid) => {
      prevGrid[i][j].flipped = flipped;
      return prevGrid;
    });
  };

  return (
    <div className="div-container pt-16">
      <GameHeader />
      <div className={`grid mx-auto grid-cols-4 w-fit gap-4 mt-[85px]`}>
        {grid.map((row, i) =>
          row.map(({ value, flipped }, j) => (
            <GameNumber
              onClick={() => gameNumberClicked(i, j)}
              value={value}
              type={gridSize == "4" ? "4x4" : "6x6"}
              theme={theme}
              visibility={flipped ? "flipped" : "not-flipped"}
              key={i * j + j}
            ></GameNumber>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
