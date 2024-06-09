import React, { useContext } from "react";
import { GameContext } from "../GameContextProvider";
import PlayerMetrics from "./GamePlayer";
import formatTime from "@/app/utils/formatTime";

const GamePlayersPanel = () => {
  const { players, currentTurn, moves, timeLeft } = useContext(GameContext);

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
          ></PlayerMetrics>
        ))
      ) : (
        <div className="flex items-center gap-8">
          <PlayerMetrics
            label="Time"
            value={formatTime(timeLeft)}
          ></PlayerMetrics>
          <PlayerMetrics label="Moves" value={moves}></PlayerMetrics>
        </div>
      )}
    </div>
  );
};

export default GamePlayersPanel;
