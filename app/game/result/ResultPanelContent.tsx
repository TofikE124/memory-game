import { PanelContext } from "@/app/components/Panel/PanelContextProvider";
import { useContext, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import ResultPanelButtons from "./ResultPanelButtons";
import ResultPanelLeaderBoard from "./ResultPanelLeaderBoard";

const ResultPanelContent = () => {
  const { sortedPlayers, timeLeft } = useContext(GameContext);
  const { openPanel } = useContext(PanelContext);

  useEffect(() => {
    const handleGameEnd = () => {
      openPanel();
    };

    window.addEventListener("gameEnd", handleGameEnd);

    return () => {
      window.removeEventListener("gameEnd", handleGameEnd);
    };
  }, []);

  const title =
    sortedPlayers.length > 1
      ? `${sortedPlayers[0]?.label} Wins`
      : timeLeft
      ? "You d id it!"
      : "You Lost!";
  const subtitle =
    sortedPlayers.length > 1
      ? "Game Over! Here are the results..."
      : "Game Over! Here's how you got on...";

  return (
    <>
      <p className="h1 text-dark-navy">{title}</p>
      <p className="text-slate-blue mt-4">{subtitle}</p>
      <ResultPanelLeaderBoard></ResultPanelLeaderBoard>
      <ResultPanelButtons></ResultPanelButtons>
    </>
  );
};

export default ResultPanelContent;
