import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import VictoryScatterPlot, {
  ScatterData,
  ScatterDatum,
} from "../components/VictoryScatterPlot";

function ScatterPlotContainer() {
  const exampleData: ScatterData = [
    {
      x: 2,
      y: 1,
      label: "first",
      symbol: "circle",
      opacity: 0.6,
      fill: "skyblue",
      z: 10,
    },
    {
      x: 2,
      y: 2,
      label: "second",
      symbol: "circle",
      opacity: 0.6,
      fill: "red",
      z: 30,
    },
    {
      x: 3,
      y: 3,
      label: "만약 이런식으로 이슈 라벨이 엄청나게 엄청나게 길어진다면",
      symbol: "circle",
      fill: "gold",
      z: 40,
    },
    { x: 15, y: 15, label: "fourth", symbol: "circle", fill: "green", z: 30 },
  ];

  const xPadding: number =
    exampleData.reduce((acc, curr) => acc + curr.x, 0) /
    exampleData.length /
    exampleData.length;
  const yPadding: number =
    exampleData.reduce((acc, curr) => acc + curr.y, 0) /
    exampleData.length /
    exampleData.length;

  const xDomain: [number, number] = [
    Math.min(...exampleData.map((datum) => datum.x)) - xPadding,
    Math.max(...exampleData.map((datum) => datum.x)) + xPadding,
  ];
  const yDomain: [number, number] = [
    Math.min(...exampleData.map((datum) => datum.y)) - yPadding,
    Math.max(...exampleData.map((datum) => datum.y)) + yPadding,
  ];

  const [showLabels, setShowLabels] = useState<boolean>(true);

  const sortedData = [...exampleData].sort((a, b) => b.z - a.z);

  return (
    <Flex width="100%" flexDir="column" padding={4} alignItems="center">
      <VictoryScatterPlot
        data={sortedData}
        xDomain={xDomain}
        yDomain={yDomain}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
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
