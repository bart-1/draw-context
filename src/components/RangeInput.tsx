import React, { ChangeEventHandler } from "react";
interface RangeInput {
  name: string;
  min: number;
  max: number;
  step: string;
  orient?: string;
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
      orient={orient}
      value={value}
      step={step}
      onChange={handleRangeInput}
      
    />
  );
};

export default RangeInput;
