import React from "react";
import PlayerResult from "./PlayerResult";
import { Player } from "@/app/constants/GameOptions";

interface Props {
  players: Player[];
}

const ResultPanelLeaderBoard = ({ players }: Props) => {
  return (
    <div className="flex flex-col lgmd:gap-4 sm:gap-2  mt-10">
      {players.map((player, index) => (
        <PlayerResult
          key={index}
          player={player}
          isWinner={!index}
        ></PlayerResult>
      ))}
    </div>
  );
};

export default ResultPanelLeaderBoard;
