import React, { ChangeEventHandler } from "react";
interface RangeInput {
  name: string;
  min: number;
  max: number;
  step: number;
  orient?: string;
  value: number;
  handleInput: ChangeEventHandler<HTMLInputElement>;
}

const RangeInput = ({
  name,
  min,
  max,
  step,
  orient,
  value,
  handleInput,
}: RangeInput) => {
  return (
    <div style={{ textAlign: "center" }}>
      <input
        name={name}
        type="range"
        min={min}
        max={max}
        orient={orient}
        value={value}
        step={step}
        onChange={handleInput}
        style={{}}
      />
      <input
        type="number"
        name={name}
        step="1"
        value={Math.round(value)}
        onChange={handleInput}
        style={{ width: "50px" }}
      />
    </div>
  );
};

export default RangeInput;
