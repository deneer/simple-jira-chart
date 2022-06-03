import { TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { ChartPluginResponse } from "../types/chart-plugin-response.type";
import { JiraStatusColor } from "../types/jira-status-color.enum";
import { JiraStatusKey } from "../types/jira-status-key.enum";
import { getTailwindColorWithJiraStatusKey } from "../util/issue-color-util";

export type ScatterTooltipProps = {
  left: number;
  top: number;
  xAxis: string;
  yAxis: string;
  sizeAxis: string;
  data: ChartPluginResponse;
};

function ScatterTooltip({
  left,
  top,
  xAxis,
  yAxis,
  sizeAxis,
  data,
}: ScatterTooltipProps) {
  const issueColor: JiraStatusColor = getTailwindColorWithJiraStatusKey(
    data.status?.statusCategory.key as JiraStatusKey
  );
  return (
    <TooltipWithBounds
      left={left}
      top={top}
      style={{
        ...defaultStyles,
        padding: 0,
        boxShadow: "none",
        overflow: "hidden",
        opacity: "0.9",
      }}
    >
      <div className={`flex flex-col ${issueColor} p-2 max-w-md`}>
        <h2 className="text-lg font-bold text-gray-700">{data.summary}</h2>
        <ul className="list-disc ml-4">
          <li className="mt-1">
            {xAxis}: {data.x}
          </li>
          <li className="mt-1">
            {yAxis}: {data.y}
          </li>
          <li className="mt-1">
            {sizeAxis}: {data.size}
          </li>
          <li className="mt-1">
            Assignee:{" "}
            {data.assignee ? data.assignee.displayName : "Not assigned"}
          </li>
          <li className="mt-1">
            Status: {data.status ? data.status.name : "No Status"}
          </li>
        </ul>
      </div>
    </TooltipWithBounds>
  );
}

export default ScatterTooltip;
