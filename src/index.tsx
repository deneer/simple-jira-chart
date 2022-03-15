import ForgeUI, { render } from "@forge/ui";
import ChartConfig from "./components/ChartConfig";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("getIssues", (req) => {
  console.log(req);

  return {
    payload: [
      { x: 100, y: 200, z: 200 },
      { x: 120, y: 100, z: 260 },
      { x: 170, y: 300, z: 400 },
      { x: 140, y: 250, z: 280 },
      { x: 150, y: 400, z: 500 },
      { x: 110, y: 280, z: 200 },
    ],
  };
});

export const config = render(<ChartConfig />);
export const handler = resolver.getDefinitions();
