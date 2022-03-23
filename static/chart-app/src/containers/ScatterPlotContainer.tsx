import { Switch } from "@headlessui/react";
import { useState } from "react";
import VictoryScatterPlot, {
  ScatterData,
} from "../components/VictoryScatterPlot";

interface ScatterPlotContainerProps {
  plotData: ScatterData;
  xAxis: string;
  yAxis: string;
  zAxis: string;
}

function ScatterPlotContainer({
  plotData,
  xAxis,
  yAxis,
  zAxis,
}: ScatterPlotContainerProps) {
  const xPadding: number =
    plotData.reduce((acc, curr) => acc + curr.x, 0) /
    plotData.length /
    plotData.length;
  const yPadding: number =
    plotData.reduce((acc, curr) => acc + curr.y, 0) /
    plotData.length /
    plotData.length;

  const xDomain: [number, number] = [
    Math.min(...plotData.map((datum) => datum.x)) - xPadding,
    Math.max(...plotData.map((datum) => datum.x)) + xPadding,
  ];
  const yDomain: [number, number] = [
    Math.min(...plotData.map((datum) => datum.y)) - yPadding,
    Math.max(...plotData.map((datum) => datum.y)) + yPadding,
  ];

  const [showLabels, setShowLabels] = useState<boolean>(true);

  const sortedData = [...plotData].sort((a, b) => b.z - a.z);

  return (
    <div className="flex flex-col w-full p-4 items-center">
      <VictoryScatterPlot
        data={sortedData}
        xDomain={xDomain}
        yDomain={yDomain}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        xAxis={xAxis}
        yAxis={yAxis}
        zAxis={zAxis}
      ></VictoryScatterPlot>
      <div className="flex flex-row w-full justify-center">
        <Switch.Group>
          <div className="flex items-center">
            <Switch.Label className="mr-4">Show Labels</Switch.Label>
            <Switch
              checked={showLabels}
              onChange={setShowLabels}
              className={`${
                showLabels ? "bg-cyan-600" : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span
                className={`${
                  showLabels ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  );
}

export default ScatterPlotContainer;
