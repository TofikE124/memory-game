import React, { useContext } from "react";
import { GameContext } from "../GameContextProvider";
import GamePlayer from "./GamePlayer";

const GamePlayersPanel = () => {
  const { players, currentTurn } = useContext(GameContext);

  return (
    <div className="flex lg:gap-8 md:gap-3 sm:gap-6 mt-[83px] flex-wrap w-fit mx-auto">
      {players.map((player, index) => (
        <GamePlayer
          key={index}
          current={index == currentTurn}
          player={player}
        ></GamePlayer>
      ))}
    </div>
  );
};

export default GamePlayersPanel;
