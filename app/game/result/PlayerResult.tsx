interface Props {
  label: string;
  value: string | number;
  isWinner?: boolean;
}

const Result = ({ label, value, isWinner = false }: Props) => {
  return (
    <div className={`player-result ${isWinner ? "winner" : ""}`}>
      <p className="player-label">
        {label} {isWinner ? " (Winner!)" : ""}
      </p>
      <h2 className="h2 player-score">{value}</h2>
    </div>
  );
};

export default Result;
