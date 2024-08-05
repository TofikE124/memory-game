"use client";
import Link from "next/link";
import { useContext } from "react";
import HeaderMobilePanel from "./HeaderMobilePanel";
import { GameStateContext } from "../GameContextProvider";

const GameHeader = () => {
  const { restartGame } = useContext(GameStateContext);

  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[40px] sm:text-[25px] text-dark-navy font-bold">
        Memory
      </h2>
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
