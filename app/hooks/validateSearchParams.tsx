"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  Difficulty,
  GameTheme,
  GridSize,
  PlayersNumber,
} from "../constants/MenuOptions"; // Adjust import paths accordingly

interface SearchParams {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
  difficulty: Difficulty;
}

const useValidateSearchParams = ({
  gridSize,
  playersNumber,
  theme,
  difficulty,
}: SearchParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    let newGridSize = validateParam<GridSize>(
      parseInt(gridSize),
      Object.values(GridSize) as GridSize[],
      GridSize._4X4
    );

    let newPlayersNumber = validateParam(
      parseInt(playersNumber),
      Object.values(PlayersNumber) as PlayersNumber[],
      PlayersNumber._3
    );

    let newTheme = validateParam(
      theme,
      Object.values(GameTheme),
      GameTheme.NUMBERS
    );

    let newDifficulty = validateParam(
      difficulty,
      Object.values(Difficulty),
      Difficulty.EASY
    );

    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("theme", newTheme);
    urlSearchParams.set("playersNumber", newPlayersNumber.toString());
    urlSearchParams.set("gridSize", newGridSize.toString());
    urlSearchParams.set("difficulty", newDifficulty.toString());
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }, [gridSize, playersNumber, theme, router]);
};

function validateParam<T extends { toString: () => string }>(
  param: T,
  values: T[],
  defaultValue: T
) {
  if (values.includes(param)) return param.toString();
  return defaultValue;
}

export default useValidateSearchParams;
