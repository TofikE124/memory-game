import { PanelContext } from "@/app/components/Panel/PanelContextProvider";
import React, { useContext } from "react";

const HeaderMobileMenuButon = () => {
  const { openPanel } = useContext(PanelContext);

  return (
    <button className="button-primary" onClick={openPanel}>
      Menu
    </button>
  );
};

export default HeaderMobileMenuButon;
