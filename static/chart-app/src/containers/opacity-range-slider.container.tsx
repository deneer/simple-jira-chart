import { useAtom } from "jotai";
import { RangeSlider } from "../components/range-slider";
import { opacityAtom } from "../store/atoms/scatter-plot.atom";

export function OpacityRangeSliderContainer() {
  const [opacity, setOpacity] = useAtom(opacityAtom);

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOpacity(+e.target.value);

  return (
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
  );
}
