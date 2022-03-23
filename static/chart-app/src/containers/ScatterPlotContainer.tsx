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

  const sortedData = [...plotData].sort((a, b) => b.z - a.z);

  return (
    <div className="flex flex-col w-full p-4 items-center">
      <VictoryScatterPlot
        data={sortedData}
        xDomain={xDomain}
        yDomain={yDomain}
        xAxis={xAxis}
        yAxis={yAxis}
        zAxis={zAxis}
      ></VictoryScatterPlot>
    </div>
  );
}

export default ScatterPlotContainer;
