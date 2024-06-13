import React, { ReactNode } from "react";

interface Props {
  active?: boolean;
  children: ReactNode;
  extraDetails?: number | string;
  onClick?: () => void;
}
const MenuSelection = ({
  active,
  extraDetails,
  children,
  onClick = () => {},
}: Props) => {
  return (
    <div
      className={`flex lgmd:flex-col items-center gap-2 ${
        extraDetails ? "sm:flex-row sm:mr-auto" : ""
      }`}
    >
      <button
        onClick={onClick}
        className={`menu-selection ${active ? "active" : ""}`}
      >
        {children}
      </button>
      {extraDetails ? (
        <p className="bg-light-salmon text-white rounded-lg text-center w-fit p-2">
          {extraDetails}
        </p>
      ) : null}
    </div>
  );
};

export default MenuSelection;
