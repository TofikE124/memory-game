import { Player } from "@/app/constants/GameOptions";
import React from "react";

interface Props {
  current: boolean;
  player: Player;
}

const GamePlayer = ({ current, player }: Props) => {
  return (
    <div>
      <div className={`game-player  ${current ? "current" : ""}`}>
        <p className="player-label h-fit sm:hidden">{player.label}</p>
        <p className="player-label h-fit lgmd:hidden">{player.shortLabel}</p>
        <h2 className="player-score h2">{player.score}</h2>
      </div>
      {current ? (
        <p className="text-[13px] text-dark-navy uppercase w-full text-center mt-6 sm:hidden">
          Current Turn
        </p>
      ) : null}
    </div>
  );
};

export default GamePlayer;
