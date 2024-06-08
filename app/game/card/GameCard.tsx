import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { GameTheme } from "../../constants/MenuOptions";
import MemoryCardIcon from "../../components/MemoryCardIcon";

interface Props {
  value: number | IconDefinition;
  theme: GameTheme;
  type: "4x4" | "6x6";
  visibility: "flipped" | "not-flipped" | "selected";
  onClick?: () => void;
}

const GameCard = ({
  onClick = () => {},
  value,
  visibility,
  type,
  theme,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`game-number relative game-number-${type} ${visibility}`}
    >
      {visibility != "not-flipped" ? (
        <div className={"game-number-content"}>
          {theme == GameTheme.NUMBERS ? (value as number) : null}
          {theme == GameTheme.ICONS ? (
            <MemoryCardIcon icon={value as IconDefinition} />
          ) : null}
        </div>
      ) : null}
    </button>
  );
};

export default GameCard;
