import React, { useContext, useEffect, useState } from "react";
import ResultPanelButtons from "./ResultPanelButtons";
import ResultPanelLeaderBoard from "./ResultPanelLeaderBoard";
import { Player } from "@/app/constants/GameOptions";
import { PanelContext } from "@/app/components/Panel/PanelContextProvider";
import { GameContext } from "../GameContextProvider";

const ResultPanelContent = () => {
  const { getSortedPlayers, players, restartGame } = useContext(GameContext);
  const { openPanel, closePanel } = useContext(PanelContext);

  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setSortedPlayers(getSortedPlayers());
  }, [players]);

  useEffect(() => {
    const handleGameEnd = () => {
      openPanel();
    };

    window.addEventListener("gameEnd", handleGameEnd);

    return () => {
      window.removeEventListener("gameEnd", handleGameEnd);
    };
  }, []);

  return (
    <>
      <p className="h1 text-dark-navy">{sortedPlayers[0]?.label} Wins</p>
      <p className="text-slate-blue mt-4">Game Over! Here are the results...</p>
      <ResultPanelLeaderBoard players={sortedPlayers}></ResultPanelLeaderBoard>
      <ResultPanelButtons></ResultPanelButtons>
    </>
  );
};

export default ResultPanelContent;
