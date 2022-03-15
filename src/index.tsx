import ForgeUI, { render } from "@forge/ui";
import ChartConfig from "./components/ChartConfig";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("getIssues", (req) => {
  console.log(req);

  return {
    payload: [
      { x: 100, y: 200, z: 200, label: "label 1" },
      { x: 120, y: 100, z: 260, label: "label 2" },
      { x: 170, y: 300, z: 400, label: "label 3" },
      { x: 140, y: 250, z: 280, label: "label 4" },
      { x: 150, y: 400, z: 500, label: "label 5" },
      { x: 110, y: 280, z: 200, label: "label 6" },
    ],
  };
});

export const config = render(<ChartConfig />);
export const handler = resolver.getDefinitions();
