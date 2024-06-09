import { useContext, useEffect, useState } from "react";
import { Grid } from "../../constants/GameOptions";
import { GameTheme } from "../../constants/MenuOptions";
import { generateGrid } from "../../utils/gridGenerator";
import GameCard from "./GameCard";
import { GameContext } from "../GameContextProvider";

interface Props {
  theme: GameTheme;
  playersNumber?: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
}

const GameNumbersGrid = ({ gridSize, theme }: Props) => {
  const { grid, gameNumberClicked, isSelected } = useContext(GameContext);

  return (
    <div
      className="grid mx-auto w-fit gap-4 mt-[85px]"
      style={{ gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))` }}
    >
      {grid.map((row, i) =>
        row.map(({ value, flipped }, j) => (
          <GameCard
            onClick={() => gameNumberClicked(i, j)}
            value={value}
            type={gridSize == "4" ? "4x4" : "6x6"}
            theme={theme}
            visibility={
              isSelected(i, j)
                ? "selected"
                : flipped
                ? "flipped"
                : "not-flipped"
            }
            key={i * j + j}
          ></GameCard>
        ))
      )}
    </div>
  );
};

export default GameNumbersGrid;
