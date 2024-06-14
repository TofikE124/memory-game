"use client";
import { GameTheme, Difficulty } from "@/app/constants/MenuOptions";
import useValidateSearchParams from "@/app/hooks/validateSearchParams";
import React from "react";
import GameNumbersGrid from "./card/GameCardsGrid";
import GameContextProvider from "./GameContextProvider";
import GameHeader from "./header/GameHeader";
import PlayerMetricsPanel from "./player/PlayerMetricsPanel";
import ResultPanel from "./result/ResultPanel";

interface Props {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
  difficulty: Difficulty;
}

const PageContent = ({ difficulty, gridSize, playersNumber, theme }: Props) => {
  const isRedirecting = useValidateSearchParams({
    gridSize,
    playersNumber,
    theme,
    difficulty,
  });

  if (isRedirecting) return <></>;

  return (
    <div className="div-container pt-8 pb-16">
      <GameContextProvider
        gridSize={parseInt(gridSize)}
        theme={theme}
        playersNumber={parseInt(playersNumber)}
        difficulty={difficulty}
      >
        <GameHeader />
        <GameNumbersGrid
          theme={theme}
          gridSize={parseInt(gridSize)}
        ></GameNumbersGrid>
        <PlayerMetricsPanel></PlayerMetricsPanel>
        <ResultPanel></ResultPanel>
      </GameContextProvider>
    </div>
  );
};

export default PageContent;
