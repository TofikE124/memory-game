"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface PanelContextType {
  isVisible: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

export const PanelContext = createContext<PanelContextType>(
  {} as PanelContextType
);

const PanelContextProvider = ({ children }: PropsWithChildren) => {
  const [isVisible, setVisible] = useState(false);

  const closePanel = () => {
    setVisible(false);
  };

  const openPanel = () => {
    setVisible(true);
  };

  return (
    <PanelContext.Provider
      value={{
        isVisible,
        closePanel,
        openPanel,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export default PanelContextProvider;
