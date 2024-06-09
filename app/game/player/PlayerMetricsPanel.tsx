import React, { useContext } from "react";
import { GameContext, soloRoundTime, turnTime } from "../GameContextProvider";
import PlayerMetrics from "./PlayerMetrics";
import formatTime from "@/app/utils/formatTime";

const PlayerMetricsPanel = () => {
  const { players, currentTurn, moves, timeLeft, currentTurnTimeLeft } =
    useContext(GameContext);

  return (
    <div className="flex lg:gap-8 md:gap-3 sm:gap-6 mt-[83px] flex-wrap w-fit mx-auto">
      {players.length > 1 ? (
        players.map((player, index) => (
          <PlayerMetrics
            key={index}
            current={index == currentTurn}
            label={player.label}
            shortLabel={player.shortLabel}
            value={player.score}
            timeLeft={currentTurnTimeLeft}
            fullTime={turnTime}
            timeProgress={index == currentTurn}
          ></PlayerMetrics>
        ))
      ) : (
        <div className="flex items-center gap-8">
          <PlayerMetrics
            label="Time"
            value={formatTime(timeLeft)}
            timeLeft={timeLeft}
            fullTime={soloRoundTime}
            timeProgress={true}
          ></PlayerMetrics>
          <PlayerMetrics label="Moves" value={moves}></PlayerMetrics>
        </div>
      )}
    </div>
  );
};

export default PlayerMetricsPanel;
