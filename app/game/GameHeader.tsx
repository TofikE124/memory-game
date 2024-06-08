import React from "react";

const GameHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[40px] text-dark-navy font-bold">Memory</h2>
      <div className="flex items-center gap-4">
        <button className="button-primary">Restart</button>
        <button className="button-secondary">Restart</button>
      </div>
    </div>
  );
};

export default GameHeader;
