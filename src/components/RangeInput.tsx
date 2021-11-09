import React, { ChangeEventHandler } from "react";
interface RangeInput {
  name:string
  min: string;
  max: string;
  step: string;
  orient: string;
  value: number;
  handleRangeInput: ChangeEventHandler<HTMLInputElement>;
}

const RangeInput = ({
  name,
  min,
  max,
  step,
  orient,
  value,
  handleRangeInput,
}: RangeInput) => {
  return (
    <input
      name={name}
      type="range"
      min={min}
      max={max}
      step={step}
      {...orient}
      value={value}
      onChange={handleRangeInput}
    />
  );
};

export default RangeInput;
