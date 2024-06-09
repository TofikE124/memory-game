import { Grid } from "../constants/GameOptions";
import { GameTheme, GridSize } from "../constants/MenuOptions";
import { icons } from "../constants/icons";

export const generateGrid = (gridSize: GridSize, theme: GameTheme): Grid => {
  // Getting the avilable values depending on the theme
  const avilableValues =
    theme == GameTheme.ICONS
      ? [...icons]
      : getNumbersArr((gridSize * gridSize) / 2);
  shuffleArray(avilableValues);

  const avilableSlots = getAvilableSlotsArr(gridSize);
  shuffleArray(avilableSlots);

  const grid: Grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(0)
  );

  for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
    const randVal = avilableValues.pop()!;
    const [row1, col1] = avilableSlots.pop()!;
    const [row2, col2] = avilableSlots.pop()!;

    grid[row1][col1] = {
      value: randVal,
      flipped: false,
    };
    grid[row2][col2] = {
      value: randVal,
      flipped: false,
    };
  }
  return grid;
};

const getNumbersArr = (size: number) => {
  return new Array(size).fill(0).map((value, index) => index);
};

const getAvilableSlotsArr = (size: number) => {
  return new Array(size * size)
    .fill(0)
    .map((x, y) => [Math.floor(y / size), y % size]);
};

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
