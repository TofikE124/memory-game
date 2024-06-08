import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MenuSectionOption } from "../components/Menu/MenuSection";

// Menu
export enum GameTheme {
  NUMBERS = "Numbers",
  ICONS = "Icons",
}

export enum GridSize {
  _4X4 = 4,
  _6X6 = 6,
}

export interface GameProps {
  theme: GameTheme;
  playersNumber: 1 | 2 | 3 | 4;
  gridSize: GridSize;
}

interface MenuSectionType {
  options: MenuSectionOption[];
  queryParamName: string;
  title: string;
}

export const menuSections: MenuSectionType[] = [
  {
    title: "Select Theme",
    options: [
      { label: "Numbers", value: GameTheme.NUMBERS },
      { label: "Icons", value: GameTheme.ICONS },
    ],
    queryParamName: "theme",
  },
  {
    title: "Number of Players",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
    queryParamName: "playersNumber",
  },
  {
    title: "Grid Size",
    options: [
      { label: "4x4", value: GridSize._4X4 },
      { label: "6x6", value: GridSize._6X6 },
    ],
    queryParamName: "gridSize",
  },
];

// Game
interface CellType {
  value: number | IconDefinition;
  flipped: boolean;
}

export type GridType = CellType[][];
