import formatTime from "@/app/utils/formatTime";
import { useEffect, useRef } from "react";

interface Props {
  current?: boolean;
  label: string;
  shortLabel?: string;
  value: string | number;
  timeLeft?: number;
  fullTime?: number;
  timeProgress?: boolean;
}

const PlayerMetrics = ({
  current,
  label,
  shortLabel,
  value,
  timeLeft,
  timeProgress,
  fullTime,
}: Props) => {
  const playerMetricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof timeLeft == "undefined") return;
    const progress = (timeLeft! / fullTime!) * 100;
    playerMetricsRef.current?.style.setProperty(
      "--progress-width",
      `${progress}%`
    );
  }, [timeLeft]);

  return (
    <div>
      <div
        ref={playerMetricsRef}
        className={`player-metrics  ${current ? "current" : ""} ${
          timeProgress ? "progress" : ""
        }`}
      >
        <p className="metrics-label h-fit sm:hidden">{label}</p>
        <p className="metrics-label h-fit lgmd:hidden">{shortLabel || label}</p>
        <h2 className="metrics-value h2">{value}</h2>
        <span className="up-triangle"></span>
      </div>
      {current ? (
        <div className="w-full flex items-center lgmd:mt-6 sm:mt-2">
          <p className="text-[13px] text-dark-navy uppercase w-full text-center sm:hidden">
            Current Turn
          </p>
          {timeLeft != undefined ? (
            <p className="text-[13px] text-light-salmon uppercase w-full text-center  sm:hidden">
              {formatTime(timeLeft)}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default PlayerMetrics;
