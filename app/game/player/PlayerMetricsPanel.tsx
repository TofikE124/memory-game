"use client";
import React, { useContext } from "react";
import PlayerMetrics from "./PlayerMetrics";
import formatTime from "@/app/utils/formatTime";
import { PlayerContext, TimerContext, turnTime } from "../GameContextProvider";

const PlayerMetricsPanel = () => {
  const { players, currentTurn, moves } = useContext(PlayerContext);
  const { currentTurnTimeLeft, timeLeft, getRoundTime } =
    useContext(TimerContext);

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
            fullTime={getRoundTime()}
            timeProgress={true}
          ></PlayerMetrics>
          <PlayerMetrics label="Moves" value={moves}></PlayerMetrics>
        </div>
      )}
    </div>
  );
};

export default PlayerMetricsPanel;
