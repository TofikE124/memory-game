import { Player } from "@/app/constants/GameOptions";
import React from "react";

interface Props {
  current?: boolean;
  label: string;
  shortLabel?: string;
  value: string | number;
}

const PlayerMetrics = ({ current, label, shortLabel, value }: Props) => {
  return (
    <div>
      <div className={`player-metrics  ${current ? "current" : ""}`}>
        <p className="metrics-label h-fit sm:hidden">{label}</p>
        <p className="metrics-label h-fit lgmd:hidden">{shortLabel || label}</p>
        <h2 className="metrics-value h2">{value}</h2>
      </div>
      {current ? (
        <p className="text-[13px] text-dark-navy uppercase w-full text-center mt-6 sm:hidden">
          Current Turn
        </p>
      ) : null}
    </div>
  );
};

export default PlayerMetrics;
