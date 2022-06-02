import { TooltipWithBounds } from "@visx/tooltip";
import { ChartPluginResponse } from "../types/chart-plugin-response.type";

export type ScatterTooltipProps = {
  left: number;
  top: number;
  data: ChartPluginResponse;
};

function ScatterTooltip({ left, top, data }: ScatterTooltipProps) {
  return (
    <TooltipWithBounds left={left} top={top}>
      <div style={{ width: "200px" }}>
        <strong>x:</strong> {data.x}
      </div>
      <div>
        <strong>y:</strong> {data.y}
      </div>
    </TooltipWithBounds>
  );
}

export default ScatterTooltip;
