import Panel from "@/app/components/Panel/Panel";
import PanelContextProvider from "@/app/components/Panel/PanelContextProvider";
import ResultPanelContent from "./ResultPanelContent";

const ResultPanel = () => {
  return (
    <PanelContextProvider>
      <Panel>
        <ResultPanelContent></ResultPanelContent>
      </Panel>
    </PanelContextProvider>
  );
};

export default ResultPanel;
