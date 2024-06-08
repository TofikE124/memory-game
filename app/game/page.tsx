"use client";
import { GameTheme } from "../constants/MenuOptions";
import GameNumbersGrid from "./card/GameCardsGrid";
import GameContextProvider from "./GameContextProvider";
import GameHeader from "./GameHeader";
import GamePlayersPanel from "./player/GamePlayersPanel";

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
        gridSize={parseInt(gridSize)}
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
