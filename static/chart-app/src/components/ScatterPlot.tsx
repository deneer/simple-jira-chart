import {
  CartesianGrid,
  LabelList,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer,
} from "recharts";
import { getRandomFloat } from "../lib/util";

interface ScatterPlotProps {
  plotData: { x: number; y: number; z: number; label: string }[];
  xAxisName: string;
  yAxisName: string;
  zAxisName: string;
}

const ScatterPlot = ({
  plotData,
  xAxisName,
  yAxisName,
  zAxisName,
}: ScatterPlotProps) => {
  const dataIndices = plotData.reduce(
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
  const jitteredData = plotData.map((issue, index) => {
    if (overlapIndices.find((el) => el === index)) {
      return {
        ...issue,
        x: issue.x + getRandomFloat(-2, 2),
        y: issue.y + getRandomFloat(-2, 2),
      };
    } else {
      return issue;
    }
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name={xAxisName}
          label={{ value: xAxisName, position: "bottom", offset: 5 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yAxisName}
          label={{
            value: yAxisName,
            position: "insideLeft",
            angle: -90,
            offset: 0,
          }}
        />
        <ZAxis type="number" dataKey="z" range={[60, 1000]} name={zAxisName} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value: any, name: any, prop: any) => {
            // add condition here
            const issue = plotData.find(
              (el) => el.label === prop.payload.label
            );
            if (name === xAxisName) return [`${issue?.x}`, `${name}`];
            else if (name === yAxisName) return [`${issue?.y}`, `${name}`];
            else if (name === zAxisName) return [`${issue?.z}`, `${name}`];
            else return "Something is wrong";
          }}
        />
        <Scatter
          name="Dev Team"
          data={jitteredData}
          fill="#8884d8"
          shape="circle"
        >
          <LabelList dataKey="label" position="bottom" offset={5} />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
