import ExcludedListContainer from "./containers/excluded-list.container";
import { OpacityRangeSliderContainer } from "./containers/opacity-range-slider.container";
import ScatterPlotContainer from "./containers/scatter-plot.container";

function App() {
  return (
    <div className="flex flex-col w-3/5 min-w-xl items-center mr-auto ml-auto">
      <ScatterPlotContainer />
      <OpacityRangeSliderContainer />
      <ExcludedListContainer />
    </div>
  );
}

export default App;
