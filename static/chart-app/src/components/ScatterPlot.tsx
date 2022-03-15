import {
  CartesianGrid,
  LabelList,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

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
}: ScatterPlotProps) => (
  // TODO: need to handle null or undefined of plotData
  <ScatterChart
    width={400}
    height={300}
    margin={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }}
  >
    <CartesianGrid />
    <XAxis type="number" dataKey="x" name={xAxisName} />
    <YAxis type="number" dataKey="y" name={yAxisName} />
    <ZAxis type="number" dataKey="z" range={[60, 1000]} name={zAxisName} />
    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
    <Scatter name="Dev Team" data={plotData} fill="#8884d8" shape="circle">
      <LabelList dataKey="label" position="bottom" offset={10} />
    </Scatter>
  </ScatterChart>
);

export default ScatterPlot;
