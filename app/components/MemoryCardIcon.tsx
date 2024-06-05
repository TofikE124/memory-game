import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  icon: IconProp;
  size?: number;
}

const MemoryCardIcon = ({ icon, size = 40 }: Props) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`text-[${size}] text-midnight-blue`}
      width={size}
    />
  );
};

export default MemoryCardIcon;
