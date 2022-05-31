import ExcludedListContainer from "./containers/excluded-list.container";
import ScatterPlotContainer from "./containers/scatter-plot.container";

function App() {
  return (
    <div className="flex flex-col w-max items-center mr-auto ml-auto">
      <h1 className="font-bold text-2xl text-blue-900">New Chart!</h1>
      <ScatterPlotContainer />
      <ExcludedListContainer />
    </div>
  );
}

export default App;
