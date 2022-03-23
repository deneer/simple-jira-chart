import { ScatterDatum } from "../components/VictoryScatterPlot";

export function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min; //최댓값은 제외, 최솟값은 포함
}

export function calculateWidth(
  datum: ScatterDatum,
  xAxis: string,
  yAxis: string,
  zAxis: string
): number {
  const max_length = Math.max(
    xAxis.length + String(datum.x).length,
    yAxis.length + String(datum.y).length,
    zAxis.length + String(datum.z).length,
    datum.label!.length + 4
  );
  return max_length * 12;
}
