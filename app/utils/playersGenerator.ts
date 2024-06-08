import { Player } from "../constants/GameOptions";

export const generatePlayers = (playersNumber: number): Player[] => {
  return new Array(playersNumber).fill(0).map((x, index) => ({
    label: `Player ${index + 1}`,
    shortLabel: `P${index}`,
    score: index,
  }));
};
