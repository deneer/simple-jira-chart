import { JitteredDatum } from "../components/VictoryScatterPlot";

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min; //최댓값은 제외, 최솟값은 포함
}

export function getRandomJitter(domain: [number, number]): number {
  return getRandomFloat(
    -((domain[1] - domain[0]) / 50),
    (domain[1] - domain[0]) / 50
  );
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
    .map((c) => (checkKor(c) ? 1.3 : 1))
    .reduce((a, b) => a + b, 0);
}

export function calculateWidth(
  datum: JitteredDatum,
  xAxis: string,
  yAxis: string,
  zAxis: string
): number {
  const max_length = Math.max(
    calculateStringWidth(xAxis) + String(datum.originX).length + 3,
    calculateStringWidth(yAxis) + String(datum.originY).length + 3,
    calculateStringWidth(zAxis) + String(datum.z).length + 3,
    calculateStringWidth(datum.title) + 4
  );
  return max_length * 9;
}
