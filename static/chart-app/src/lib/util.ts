import { ScatterDatum } from "../components/VictoryScatterPlot";

export function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min; //최댓값은 제외, 최솟값은 포함
}

function checkKor(str: string) {
  const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

function calculateStringWidth(str: string): number {
  return str
    .split("")
    .map((c) => (checkKor(c) ? 1.4 : 1.2))
    .reduce((a, b) => a + b, 0);
}

export function calculateWidth(
  datum: ScatterDatum,
  xAxis: string,
  yAxis: string,
  zAxis: string
): number {
  const max_length = Math.max(
    calculateStringWidth(xAxis) + String(datum.x).length + 3,
    calculateStringWidth(yAxis) + String(datum.y).length + 3,
    calculateStringWidth(zAxis) + String(datum.z).length + 3,
    calculateStringWidth(datum.label) + 4
  );
  return max_length * 9;
}
