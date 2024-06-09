import ResultPanelOverlay from "@/app/game/result/ResultPanelOverlay";
import { PropsWithChildren, useContext } from "react";
import { PanelContext } from "./PanelContextProvider";

const Panel = ({ children }: PropsWithChildren) => {
  const { isVisible, closePanel } = useContext(PanelContext);

  return (
    <div
      className={`game-players-panel fixed inset-0 z-10 grid place-items-center ${
        isVisible ? "opened" : "closed"
      }`}
    >
      <div className="panel bg-[#f2f2f2] lg:w-[655px] md:w-[600px] sm:w-[380px] px-14 pt-12 pb-[70px] rounded-[20px] text-center relative z-20">
        {children}
      </div>
      <ResultPanelOverlay closePanel={closePanel}></ResultPanelOverlay>
    </div>
  );
};

export default Panel;
