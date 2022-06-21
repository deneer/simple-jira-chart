import { useAtom } from "jotai";
import { RangeSlider } from "../components/range-slider";
import { opacityAtom, sizeUnitAtom } from "../store/atoms/scatter-plot.atom";

export function OpacityRangeSliderContainer() {
  const [opacity, setOpacity] = useAtom(opacityAtom);
  const [sizeUnit, setSizeUnit] = useAtom(sizeUnitAtom);

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOpacity(+e.target.value);

  const haneldSizeUnitChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSizeUnit(+e.target.value);

  return (
    <div className="flex space-x-4">
      <div className="w-full flex justify-between items-center mt-2 bg-blue-100 font-bold text-xs text-blue-900 rounded p-2">
        <p className="mr-4 w-24">투명도 조절</p>
        <RangeSlider
          value={opacity}
          min={0}
          max={1}
          step={0.01}
          handleChange={handleOpacityChange}
        />
      </div>
      <div className="w-full flex justify-between items-center mt-2 bg-blue-100 font-bold text-xs text-blue-900 rounded p-2">
        <p className="mr-4 w-24">점 크기 조절</p>
        <RangeSlider
          value={sizeUnit}
          min={10}
          max={1000}
          step={1}
          handleChange={haneldSizeUnitChange}
        />
      </div>
    </div>
  );
}
