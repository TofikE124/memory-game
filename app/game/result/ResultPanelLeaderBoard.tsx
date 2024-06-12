import formatTime from "@/app/utils/formatTime";
import { useContext } from "react";

import Result from "./PlayerResult";
import {
  PlayerContext,
  soloRoundTime,
  TimerContext,
} from "../GameContextProvider";

const ResultPanelLeaderBoard = () => {
  const { sortedPlayers, moves } = useContext(PlayerContext);
  const { timeLeft } = useContext(TimerContext);

  return (
    <div className="flex flex-col lgmd:gap-4 sm:gap-2  mt-10">
      {sortedPlayers.length > 1 ? (
        sortedPlayers.map((player, index) => (
          <Result
            key={index}
            label={player.label}
            value={`${player.score} Pairs`}
            isWinner={!index}
          ></Result>
        ))
      ) : (
        <>
          <Result
            label="Time Elapsed"
            value={formatTime(soloRoundTime - timeLeft)}
          ></Result>
          <Result
            label="Moves Taken"
            value={`${moves} Move${moves > 1 ? "s" : ""}`}
          ></Result>
        </>
      )}
    </div>
  );
};

export default ResultPanelLeaderBoard;
