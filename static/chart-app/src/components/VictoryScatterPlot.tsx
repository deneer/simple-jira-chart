import React, { useState } from "react";
import {
  VictoryChart,
  VictoryLabel,
  VictoryScatter,
  VictoryTooltip,
} from "victory";

export interface ScatterDatum {
  x: number;
  y: number;
  z: number;
  label?: string;
  symbol: "star" | "circle" | "square" | "diamond";
  fill?: "red" | "green" | "blue" | "purple" | string;
  opacity?: number;
}

export type ScatterData = ScatterDatum[];

export interface ScatterPlotProps {
  data: ScatterData;
  xDomain: [number, number];
  yDomain: [number, number];
  showLabels: boolean;
  setShowLabels: React.Dispatch<React.SetStateAction<boolean>>;
  xAxis: string;
  yAxis: string;
  zAxis: string;
}

class ScatterTooltip extends React.Component<any> {
  static defaultEvents = VictoryTooltip.defaultEvents;

  render() {
    console.log(this.props.datum);
    return (
      <VictoryTooltip
        {...this.props}
        text={this.props.text}
        orientation="top"
        pointerLength={0}
        flyoutStyle={{
          fill: "white",
        }}
        flyoutWidth={({ datum }) => {
          // TODO: add more complicated and delicate calculation to lengh calculation
          return datum.label.length * 15;
        }}
      />
    );
  }
}

const VictoryScatterPlot = ({
  data,
  xDomain,
  yDomain,
  showLabels,
  xAxis,
  yAxis,
  zAxis,
}: ScatterPlotProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div>
      <VictoryChart>
        <VictoryScatter
          data={data}
          maxBubbleSize={25}
          minBubbleSize={5}
          domain={{ x: xDomain, y: yDomain }}
          labelComponent={
            showLabels ? (
              hover ? (
                <ScatterTooltip
                  text={({ datum }: any) => [
                    datum.label,
                    `${xAxis} : ${datum.x}`,
                    `${yAxis} : ${datum.y}`,
                    `${zAxis} : ${datum.z}`,
                  ]}
                />
              ) : (
                <VictoryLabel
                  text={({ datum }) =>
                    datum.label.length > 8
                      ? `${datum.label.slice(0, 8)} ...`
                      : datum.label
                  }
                  renderInPortal={true}
                  dy={6}
                />
              )
            ) : (
              <ScatterTooltip
                text={({ datum }: any) => [
                  datum.label,
                  `${xAxis} : ${datum.x}`,
                  `${yAxis} : ${datum.y}`,
                  `${zAxis} : ${datum.z}`,
                ]}
              />
            )
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked"
                          ? null
                          : { text: "clicked" };
                      },
                    },
                  ];
                },
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
    </div>
  );
};

export default VictoryScatterPlot;
