import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { RangeSlider } from "../components/range-slider";
import { jiraConfigAtom } from "../store/atoms/jira.atom";
import {
  opacityAtom,
  sizeUnitAtom,
  xDomainAscendingAtom,
  yDomainAscendingAtom,
} from "../store/atoms/scatter-plot.atom";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export function OpacityRangeSliderContainer() {
  const jiraConfig = useAtomValue(jiraConfigAtom);
  const [opacity, setOpacity] = useAtom(opacityAtom);
  const [sizeUnit, setSizeUnit] = useAtom(sizeUnitAtom);
  const [xDomainAscending, setXDomainAscending] = useAtom(xDomainAscendingAtom);
  const [yDomainAscending, setYDomainAscending] = useAtom(yDomainAscendingAtom);

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOpacity(+e.target.value);

  const haneldSizeUnitChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSizeUnit(+e.target.value);

  const xDomainName = useMemo(
    () => JSON.parse(jiraConfig.extension.config.xAxis).name,
    [jiraConfig]
  );
  const yDomainName = useMemo(
    () => JSON.parse(jiraConfig.extension.config.yAxis).name,
    [jiraConfig]
  );

  return (
    <div className="flex space-x-4 mt-2">
      <div className="w-full flex justify-between items-center bg-blue-100 font-bold text-xs text-blue-900 rounded p-2">
        <p className="mr-4 min-w-fit">투명도 조절</p>
        <RangeSlider
          value={opacity}
          min={0}
          max={1}
          step={0.01}
          handleChange={handleOpacityChange}
        />
      </div>
      <div className="w-full flex justify-between items-center bg-blue-100 font-bold text-xs text-blue-900 rounded p-2">
        <p className="mr-4 min-w-fit">점 크기 조절</p>
        <RangeSlider
          value={sizeUnit}
          min={10}
          max={1000}
          step={1}
          handleChange={haneldSizeUnitChange}
        />
      </div>
      <button
        className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold p-2 rounded inline-flex items-center justify-center text-xs"
        onClick={() => setXDomainAscending(!xDomainAscending)}
      >
        <p className="min-w-max">{xDomainName}</p>
        {xDomainAscending ? <FaSortUp /> : <FaSortDown />}
      </button>
      <button
        className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold p-2 rounded inline-flex items-center justify-center text-xs"
        onClick={() => setYDomainAscending(!yDomainAscending)}
      >
        <p className="min-w-max">{yDomainName}</p>
        {yDomainAscending ? <FaSortUp /> : <FaSortDown />}
      </button>
    </div>
  );
}
