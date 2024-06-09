import { PanelContext } from "@/app/components/Panel/PanelContextProvider";
import Link from "next/link";
import { useContext } from "react";
import { GameContext } from "../GameContextProvider";

const ResultPanelButtons = () => {
  const { restartGame } = useContext(GameContext);
  const { closePanel } = useContext(PanelContext);

  return (
    <div className="flex sm:flex-col gap-4 mt-14">
      <button
        className="button-primary w-full"
        onClick={() => {
          restartGame();
          closePanel();
        }}
      >
        Restart
      </button>
      <Link href="/menu" className="button-secondary no-underline w-full">
        Setup New Game
      </Link>
    </div>
  );
};

export default ResultPanelButtons;
