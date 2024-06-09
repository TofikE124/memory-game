import formatTime from "@/app/utils/formatTime";
import Result from "./PlayerResult";
import { useContext } from "react";
import { GameContext } from "../GameContextProvider";

const ResultPanelLeaderBoard = () => {
  const { sortedPlayers, timeLeft, moves } = useContext(GameContext);

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
          <Result label="Time Elapsed" value={formatTime(timeLeft)}></Result>
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
