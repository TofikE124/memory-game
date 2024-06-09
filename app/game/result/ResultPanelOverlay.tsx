import React from "react";

interface Props {
  closePanel: () => void;
}

const ResultPanelOverlay = ({ closePanel }: Props) => {
  return (
    <div
      className="black-overlay fixed inset-0 bg-black opacity-50"
      onClick={closePanel}
    ></div>
  );
};

export default ResultPanelOverlay;
