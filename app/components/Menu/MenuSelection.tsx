import React, { ReactNode } from "react";

interface Props {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}
const MenuSelection = ({ active, children, onClick = () => {} }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`menu-selection ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
};

export default MenuSelection;
