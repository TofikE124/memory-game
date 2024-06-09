import Panel from "@/app/components/Panel/Panel";
import PanelContextProvider from "@/app/components/Panel/PanelContextProvider";
import HeaderMobilePanelContent from "./HeaderMobilePanelContent";
import HeaderMobileMenuButon from "./HeaderMobileMenuButon";

const HeaderMobilePanel = () => {
  return (
    <PanelContextProvider>
      <HeaderMobileMenuButon></HeaderMobileMenuButon>
      <Panel>
        <HeaderMobilePanelContent></HeaderMobilePanelContent>
      </Panel>
    </PanelContextProvider>
  );
};

export default HeaderMobilePanel;
