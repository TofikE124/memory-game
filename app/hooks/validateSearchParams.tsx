"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Difficulty,
  GameTheme,
  GridSize,
  PlayersNumber,
} from "../constants/MenuOptions"; // Adjust import paths accordingly
import { QueryParams } from "../constants/queryParams"; // Import the query params enum

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
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const validateAndRedirect = () => {
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
      urlSearchParams.set(QueryParams.THEME, newTheme);
      urlSearchParams.set(
        QueryParams.PLAYERS_NUMBER,
        newPlayersNumber.toString()
      );
      urlSearchParams.set(QueryParams.GRID_SIZE, newGridSize.toString());
      urlSearchParams.set(QueryParams.DIFFICULTY, newDifficulty.toString());

      const newUrl = `${pathname}?${urlSearchParams.toString()}`;
      if (newUrl !== `${pathname}?${searchParams.toString()}`) {
        setIsRedirecting(true);
        router.push(newUrl);
      } else {
        setIsRedirecting(false);
      }
    };

    validateAndRedirect();
  }, [
    gridSize,
    playersNumber,
    theme,
    difficulty,
    router,
    searchParams,
    pathname,
  ]);

  return isRedirecting;
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
