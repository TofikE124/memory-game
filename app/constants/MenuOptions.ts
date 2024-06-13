// Enums representing game settings

// Themes available for the game
export enum GameTheme {
  NUMBERS = "Numbers",
  ICONS = "Icons",
}

// Grid sizes available for the game
export enum GridSize {
  _4X4 = 4,
  _6X6 = 6,
}

// Number of players supported in the game
export enum PlayersNumber {
  _1 = 1,
  _2,
  _3,
  _4,
}

// Difficulty levels available for the game
export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

// Interface representing the properties of the game
export interface GameProps {
  theme: GameTheme;
  playersNumber: PlayersNumber;
  gridSize: GridSize;
}

// Interface representing a menu option
export interface MenuSectionOption {
  label: string;
  value: string | number;
}

// Interface representing a section in the menu
interface MenuSectionType {
  options: MenuSectionOption[];
  queryParamName: string;
  title: string;
  visible: boolean | ((params: URLSearchParams) => boolean);
}

// Menu sections for selecting game settings
export const menuSections: MenuSectionType[] = [
  {
    title: "Select Theme",
    options: [
      { label: "Numbers", value: GameTheme.NUMBERS },
      { label: "Icons", value: GameTheme.ICONS },
    ],
    queryParamName: "theme",
    visible: true,
  },
  {
    title: "Number of Players",
    options: [
      { label: "1", value: PlayersNumber._1 },
      { label: "2", value: PlayersNumber._2 },
      { label: "3", value: PlayersNumber._3 },
      { label: "4", value: PlayersNumber._4 },
    ],
    visible: true,
    queryParamName: "playersNumber",
  },
  {
    title: "Difficulty",
    options: [
      { label: "Easy", value: Difficulty.EASY },
      { label: "Medium", value: Difficulty.MEDIUM },
      { label: "Hard", value: Difficulty.HARD },
    ],
    queryParamName: "difficulty",
    visible: (params: URLSearchParams) =>
      Number(params.get("playersNumber")) === PlayersNumber._1,
  },
  {
    title: "Grid Size",
    options: [
      { label: "4x4", value: GridSize._4X4 },
      { label: "6x6", value: GridSize._6X6 },
    ],
    visible: true,
    queryParamName: "gridSize",
  },
];

// Interface representing round times for different difficulties
interface RoundTimeType {
  [Difficulty.EASY]: number;
  [Difficulty.MEDIUM]: number;
  [Difficulty.HARD]: number;
}

// Mapping of grid sizes to their respective round times for different difficulties
export const roundTimeMap: Record<GridSize, RoundTimeType> = {
  [GridSize._4X4]: {
    [Difficulty.EASY]: 120,
    [Difficulty.MEDIUM]: 60,
    [Difficulty.HARD]: 30,
  },
  [GridSize._6X6]: {
    [Difficulty.EASY]: 180,
    [Difficulty.MEDIUM]: 100,
    [Difficulty.HARD]: 60,
  },
};
