import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryScatter,
  VictoryTooltip,
} from "victory";
import { calculateWidth, getRandomJitter } from "../lib/util";

export interface ScatterDatum {
  x: number;
  y: number;
  z: number;
  title: string;
  symbol: "star" | "circle" | "square" | "diamond";
  fill?: "red" | "green" | "blue" | "purple" | string;
  opacity?: number;
}

export type JitteredDatum = ScatterDatum & {
  originX: number;
  originY: number;
};

export type ScatterData = ScatterDatum[];

export interface ScatterPlotProps {
  data: ScatterData;
  xDomain: [number, number];
  yDomain: [number, number];
  xAxis: string;
  yAxis: string;
  zAxis: string;
}

class ScatterTooltip extends React.Component<any> {
  static defaultEvents = VictoryTooltip.defaultEvents;

  render() {
    return (
      <VictoryTooltip
        constrainToVisibleArea
        {...this.props}
        orientation="top"
        pointerLength={0}
        flyoutStyle={{
          fill: "white",
        }}
        flyoutPadding={5}
        labelComponent={<VictoryLabel lineHeight={1.2} />}
        style={{ fontFamily: "Nanum Gothic", fontSize: "12px" }}
        flyoutWidth={({ datum }) => {
          return calculateWidth(
            datum,
            this.props.xAxis,
            this.props.yAxis,
            this.props.zAxis
          );
        }}
      />
    );
  }
}

const VictoryScatterPlot = ({
  data,
  xDomain,
  yDomain,
  xAxis,
  yAxis,
  zAxis,
}: ScatterPlotProps) => {
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const [jitteredData, setJitteredData] = useState<JitteredDatum[]>();
  useEffect(() => {
    const dataIndices = data.reduce(
      (acc: { [key in string]: number[] }, curr, currIndex) => ({
        ...acc,
        [JSON.stringify({ x: curr.x, y: curr.y })]: [
          ...(acc[JSON.stringify({ x: curr.x, y: curr.y })] || []),
          currIndex,
        ],
      }),
      {}
    );
    const overlapIndices = Object.keys(dataIndices)
      .filter((key) => dataIndices[key].length > 1)
      .map((key) => dataIndices[key])
      .reduce((acc, curr) => [...acc, ...curr], []);
    const jittered: JitteredDatum[] = data.map((issue, index) => {
      if (overlapIndices.find((el) => el === index)) {
        return {
          ...issue,
          x: issue.x + getRandomJitter(xDomain),
          y: issue.y + getRandomJitter(yDomain),
          originX: issue.x,
          originY: issue.y,
        };
      } else {
        return { ...issue, originX: issue.x, originY: issue.y };
      }
    });
    setJitteredData(jittered);
  }, [data, xDomain, yDomain]);

  return jitteredData ? (
    <>
      <VictoryChart>
        <VictoryAxis
          crossAxis
          label={xAxis}
          offsetY={50}
          style={{
            axis: { strokeWidth: 2, fontFamily: "Nanum Gothic" },
            grid: { stroke: "#F4F5F7", strokeWidth: 1 },
          }}
        />
        <VictoryAxis
          crossAxis
          dependentAxis
          label={yAxis}
          style={{
            axis: { strokeWidth: 2, fontFamily: "Nanum Gothic" },
            grid: { stroke: "#F4F5F7", strokeWidth: 1 },
          }}
        />
        <VictoryScatter
          data={jitteredData}
          maxBubbleSize={25}
          minBubbleSize={5}
          domain={{ x: xDomain, y: yDomain }}
          labels={({ datum }: { datum: JitteredDatum }) =>
            hover
              ? [
                  `< ${datum.title} >`,
                  `${xAxis} : ${datum.originX}`,
                  `${yAxis} : ${datum.originY}`,
                  `${zAxis} : ${datum.z}`,
                ]
              : datum.title.length > 15
              ? `${datum.title.slice(0, 15)} ...`
              : datum.title
          }
          labelComponent={
            showLabels ? (
              hover ? (
                <ScatterTooltip xAxis={xAxis} yAxis={yAxis} zAxis={zAxis} />
              ) : (
                <VictoryLabel
                  style={{ fontFamily: "Nanum Gothic", fontSize: "10px" }}
                  renderInPortal={true}
                  verticalAnchor="middle"
                  dy={0}
                />
              )
            ) : (
              <ScatterTooltip xAxis={xAxis} yAxis={yAxis} zAxis={zAxis} />
            )
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseEnter: () => {
                  showLabels && setHover(true);
                  return [
                    {
                      target: "data",
                      mutation: (props) => ({
                        style: {
                          fill: props.style.fill,
                          opacity: props.style.opacity,
                          stroke: "black",
                          strokeWidth: 2,
                        },
                      }),
                    },
                  ];
                },
                onMouseLeave: () => {
                  showLabels && setHover(false);
                  return [
                    {
                      target: "data",
                      mutation: () => {},
                    },
                  ];
                },
              },
            },
          ]}
          style={{
            data: {
              fill: ({ datum }) => datum.fill || "#b029ff",
              opacity: ({ datum }) => datum.opacity || 0.6,
            },
          }}
        />
      </VictoryChart>
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
    </>
  ) : (
    <></>
  );
};

export default VictoryScatterPlot;
