import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export interface ExcludedDatum {
  x?: number | null;
  y?: number | null;
  z?: number | null;
  title: string;
  issueKey: string;
}
interface ExcludedListProps {
  data: ExcludedDatum[];
  xAxis: string;
  yAxis: string;
  zAxis: string;
  baseUrl: string;
}

type ExcludedItemProps = ExcludedDatum &
  Pick<ExcludedListProps, "xAxis" | "yAxis" | "zAxis" | "baseUrl">;

const ExcludedItem = ({
  x,
  y,
  z,
  title,
  baseUrl,
  issueKey,
  xAxis,
  yAxis,
  zAxis,
}: ExcludedItemProps) => {
  return (
    <div className="flex flex-col mt-2 mb-2 bg-gray-50 p-4 rounded-md">
      <div className="text-lg font-semibold mb-2">
        <a href={`${baseUrl}/browse/${issueKey}`}>{title}</a>
      </div>
      <div className="flex flex-row">
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
        {z ? (
          <div className="bg-green-200 p-1 rounded-sm">
            {zAxis}: {z}
          </div>
        ) : (
          <div className="mr-2 bg-red-200 p-1 rounded-sm">
            {zAxis} (이)가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

const ExcludedList = ({
  data,
  xAxis,
  yAxis,
  zAxis,
  baseUrl,
}: ExcludedListProps) => {
  return data.length > 0 ? (
    <div className="w-full px-4 pt-2">
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
                {data.map((issue) => (
                  <ExcludedItem
                    x={issue.x}
                    y={issue.y}
                    z={issue.z}
                    title={issue.title}
                    baseUrl={baseUrl}
                    issueKey={issue.issueKey}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    zAxis={zAxis}
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
};

export default ExcludedList;
