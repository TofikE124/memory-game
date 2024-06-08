import { Player } from "@/app/constants/GameOptions";
import React from "react";

interface Props {
  player: Player;
  isWinner: boolean;
}

const PlayerResult = ({ player, isWinner }: Props) => {
  return (
    <div className={`player-result ${isWinner ? "winner" : ""}`}>
      <p className="player-label text-nowrap">
        {player.label} {isWinner ? " (Winner!)" : ""}
      </p>
      <h2 className="h2 player-score">{player.score} Pairs</h2>
    </div>
  );
};

export default PlayerResult;
