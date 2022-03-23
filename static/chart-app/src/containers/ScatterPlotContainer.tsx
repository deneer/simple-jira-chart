import { Flex, Switch, Text } from "@chakra-ui/react";
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
    <Flex width="100%" flexDir="column" padding={4} alignItems="center">
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
      <Flex width="100%" justifyContent="center">
        <Flex width="180px" alignItems="center" justifyContent="space-evenly">
          <Switch
            isChecked={showLabels}
            onChange={() => setShowLabels(!showLabels)}
            size="lg"
          />
          <Text>Show Labels</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ScatterPlotContainer;
