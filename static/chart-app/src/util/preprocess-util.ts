function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min; //최댓값은 제외, 최솟값은 포함
}

export function getRandomJitter(domain: [number, number]): number {
  const randomJitter = getRandomFloat(
    -((domain[1] - domain[0]) / 20),
    (domain[1] - domain[0]) / 20
  );

  return randomJitter;
}
