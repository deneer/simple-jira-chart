import ExcludedListContainer from "./containers/excluded-list.container";
import ScatterPlotContainer from "./containers/scatter-plot.container";

function App() {
  return (
    <div className="flex flex-col w-3/5 items-center mr-auto ml-auto">
      <ScatterPlotContainer />
      <ExcludedListContainer />
    </div>
  );
}

export default App;
