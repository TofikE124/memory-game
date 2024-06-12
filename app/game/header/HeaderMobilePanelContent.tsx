import React, { useContext } from "react";
import { PanelContext } from "@/app/components/Panel/PanelContextProvider";
import Link from "next/link";
import { GameStateContext } from "../GameContextProvider";

const HeaderMobilePanelContent = () => {
  const { restartGame } = useContext(GameStateContext);
  const { closePanel } = useContext(PanelContext);
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => {
          restartGame();
          closePanel();
        }}
        className="button-primary w-full"
      >
        Restart
      </button>
      <Link href="/menu" className="button-secondary w-full no-underline">
        New Game
      </Link>
      <button onClick={closePanel} className="button-secondary w-full">
        Resume Game
      </button>
    </div>
  );
};

export default HeaderMobilePanelContent;
