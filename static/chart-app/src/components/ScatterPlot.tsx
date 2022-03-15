import {
  CartesianGrid,
  Legend,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const jiraData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

interface ScatterPlotProps {
  plotData: { x: number; y: number; z: number }[];
}

const ScatterPlot = ({ plotData }: ScatterPlotProps) => (
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
    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
    <YAxis type="number" dataKey="y" name="weight" unit="kg" />
    <ZAxis
      type="number"
      dataKey="z"
      range={[60, 1000]}
      name="score"
      unit="km"
    />
    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
    {/* <Legend /> */}
    <Scatter name="Dev Team" data={plotData} fill="#8884d8" shape="circle" />
  </ScatterChart>
);

export default ScatterPlot;
