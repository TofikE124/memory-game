"use client";
import { Difficulty, GameTheme } from "../constants/MenuOptions";
import useValidateSearchParams from "../hooks/validateSearchParams";
import GameNumbersGrid from "./card/GameCardsGrid";
import GameContextProvider from "./GameContextProvider";
import GameHeader from "./header/GameHeader";
import PlayerMetricsPanel from "./player/PlayerMetricsPanel";
import ResultPanel from "./result/ResultPanel";

interface SearchParams {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
  difficulty: Difficulty;
}

interface Props {
  searchParams: SearchParams;
}

const Page = ({
  searchParams: { gridSize, playersNumber, theme, difficulty },
}: Props) => {
  useValidateSearchParams({ gridSize, playersNumber, theme, difficulty });

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

export default Page;
