"use client";
import { useEffect, useState } from "react";
import { Grid } from "../constants/GameOptions";
import { GameProps, GameTheme, GridSize } from "../constants/MenuOptions";
import GameHeader from "./GameHeader";
import { generateGrid } from "../utils/gridGenerator";
import GameCard from "./card/GameCard";
import GameNumbersGrid from "./card/GameCardsGrid";
import GameContextProvider from "./GameContextProvider";
import GamePlayersPanel from "./player/GamePlayersPanel";
import GamePlayer from "./player/GamePlayer";

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
      <GameContextProvider
        gridSize={gridSize}
        theme={theme}
        playersNumber={parseInt(playersNumber)}
      >
        <GameHeader />
        <GameNumbersGrid theme={theme} gridSize={gridSize}></GameNumbersGrid>
        <GamePlayersPanel></GamePlayersPanel>
      </GameContextProvider>
    </div>
  );
};

export default page;
