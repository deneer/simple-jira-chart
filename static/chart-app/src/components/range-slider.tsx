export type RangeSliderProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function RangeSlider({
  value,
  min,
  max,
  step,
  handleChange,
}: RangeSliderProps) {
  return (
    <>
      <input
        id="steps-range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </>
  );
}
