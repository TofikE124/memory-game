import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Game
interface CellType {
  value: number | IconDefinition;
  flipped: boolean;
}

export type Grid = CellType[][];

export interface Player {
  label: string;
  shortLabel: string;
  score: number;
}
