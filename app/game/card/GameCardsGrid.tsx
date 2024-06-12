import { useContext } from "react";
import { Oval } from "react-loader-spinner";
import { GameTheme } from "../../constants/MenuOptions";
import GameCard from "./GameCard";
import { GridContext } from "../GameContextProvider";

interface Props {
  theme: GameTheme;
  playersNumber?: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
}

const GameNumbersGrid = ({ gridSize, theme }: Props) => {
  const { grid, gameNumberClicked, isSelected } = useContext(GridContext);

  return (
    <div
      className="grid mx-auto w-fit gap-4 mt-[50px]"
      style={{ gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))` }}
    >
      {!grid.length ? (
        <div className="w-full col-span-full">
          <Oval
            height="200"
            width="200"
            color="#fda214"
            secondaryColor="#304859"
          />
        </div>
      ) : null}

      {grid.length
        ? grid.map((row, i) =>
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
          )
        : null}
    </div>
  );
};

export default GameNumbersGrid;
