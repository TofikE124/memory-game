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
import GameNumbersGrid from "./GameNumbersGrid";
import GameContextProvider from "./GameContextProvider";

interface SearchParams {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
}

interface Props {
  searchParams: SearchParams;
}

const page = ({ searchParams: { gridSize, playersNumber, theme } }: Props) => {
  return (
    <div className="div-container pt-16">
      <GameContextProvider gridSize={gridSize} theme={theme}>
        <GameHeader />
        <GameNumbersGrid theme={theme} gridSize={gridSize}></GameNumbersGrid>
      </GameContextProvider>
    </div>
  );
};

export default page;
