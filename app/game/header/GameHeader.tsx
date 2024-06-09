import React, { useContext } from "react";
import { GameContext } from "../GameContextProvider";
import Link from "next/link";
import HeaderMobilePanel from "./HeaderMobilePanel";

const GameHeader = () => {
  const { restartGame } = useContext(GameContext);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[40px] text-dark-navy font-bold">Memory</h2>
      <div className="flex items-center gap-4 sm:hidden">
        <button className="button-primary" onClick={restartGame}>
          Restart
        </button>
        <Link href="/menu" className="button-secondary no-underline">
          New Game
        </Link>
      </div>
      <div className="lgmd:hidden">
        <HeaderMobilePanel></HeaderMobilePanel>
      </div>
    </div>
  );
};

export default GameHeader;
