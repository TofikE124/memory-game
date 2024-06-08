import { Player } from "@/app/constants/GameOptions";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../GameContextProvider";
import PlayerResult from "./PlayerResult";

const ResultPanel = () => {
  const [isVisible, setVisible] = useState(false);
  const { getSortedPlayers, players } = useContext(GameContext);

  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  useEffect(() => {
    setSortedPlayers(getSortedPlayers());
  }, [players]);

  useEffect(() => {
    const handleGameEnd = () => {
      setVisible(true);
    };

    window.addEventListener("gameEnd", handleGameEnd);

    return () => {
      window.removeEventListener("gameEnd", handleGameEnd);
    };
  }, []);

  return (
    <>
      <div
        className={`game-players-panel fixed inset-0 grid place-items-center ${
          isVisible ? "opened" : "closed"
        }`}
      >
        <div className="panel bg-[#f2f2f2] w-[655px] px-14 pt-12 pb-[70px] rounded-[20px] text-center z-10">
          <p className="h1 text-dark-navy">{sortedPlayers[0]?.label} Wins</p>
          <p className="text-slate-blue mt-4">
            Game Over! Here are the results...
          </p>
          <div className="flex flex-col gap-4 mt-10">
            {sortedPlayers.map((player, index) => (
              <PlayerResult
                key={index}
                player={player}
                isWinner={!index}
              ></PlayerResult>
            ))}
          </div>
          <div className="flex gap-4 mt-14">
            <button className="button-primary w-full">Restart</button>
            <button className="button-secondary w-full">Setup new Game</button>
          </div>
        </div>
        <div
          className="black-overlay fixed inset-0 bg-black opacity-50"
          onClick={() => {
            setVisible(false);
          }}
        ></div>
      </div>
    </>
  );
};

export default ResultPanel;
