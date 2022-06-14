import { Disclosure } from "@headlessui/react";
import { ChartPluginResponse } from "../types/chart-plugin-response.type";
import { ChevronUpIcon } from "@heroicons/react/solid";
import ListItem from "./list-item";

export type ExcludedLisProps = {
  data: ChartPluginResponse[];
  xAxis: string;
  yAxis: string;
  sizeAxis: string;
  baseUrl: string;
};

function ExcludedList({
  data,
  xAxis,
  yAxis,
  sizeAxis,
  baseUrl,
}: ExcludedLisProps) {
  return data.length > 0 ? (
    <div className="w-full mt-2">
      <div className="w-full p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-xl font-large font-bold text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 items-center">
                <span>Excluded Items</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {data.map((issue, index) => (
                  <ListItem
                    key={`excluded-issue-${issue.issueKey}`}
                    x={issue.x}
                    y={issue.y}
                    size={issue.size}
                    summary={issue.summary}
                    baseUrl={baseUrl}
                    issueKey={issue.issueKey}
                    status={issue.status}
                    assignee={issue.assignee}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    sizeAxis={sizeAxis}
                  />
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ExcludedList;
