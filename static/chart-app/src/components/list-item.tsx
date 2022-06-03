import { router } from "@forge/bridge";
import { ChartPluginResponse } from "../types/chart-plugin-response.type";

export type ListItemProps = ChartPluginResponse & {
  baseUrl: string;
  xAxis: string;
  yAxis: string;
  sizeAxis: string;
};

function ListItem({
  x,
  y,
  size,
  summary,
  baseUrl,
  issueKey,
  status,
  assignee,
  xAxis,
  yAxis,
  sizeAxis,
}: ListItemProps) {
  return (
    <div className="flex flex-col mt-2 mb-2 bg-gray-50 p-4 rounded-md ">
      <div
        className="text-lg font-semibold mb-2 cursor-pointer"
        onClick={() => router.open(`${baseUrl}/browse/${issueKey}`)}
      >
        {summary}
      </div>
      <div className="flex flex-row overflow-auto">
        {x ? (
          <div className="mr-2 bg-green-200 p-1 rounded-sm">
            {xAxis}: {x}
          </div>
        ) : (
          <div className="mr-2 bg-red-200 p-1 rounded-sm">
            {xAxis} (이)가 없습니다.
          </div>
        )}
        {y ? (
          <div className="mr-2 bg-green-200 p-1 rounded-sm">
            {yAxis}: {y}
          </div>
        ) : (
          <div className="mr-2 bg-red-200 p-1 rounded-sm">
            {yAxis} (이)가 없습니다.
          </div>
        )}
        {size ? (
          <div className="bg-green-200 p-1 rounded-sm">
            {sizeAxis}: {size}
          </div>
        ) : (
          <div className="mr-2 bg-red-200 p-1 rounded-sm">
            {sizeAxis} (이)가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
