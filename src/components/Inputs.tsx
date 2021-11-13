import React, { ChangeEventHandler, PropsWithChildren, PropsWithoutRef } from "react";

interface RangeInput {
  name: string;
  min: number;
  max: number;
  step: number;
  orient?: string;
  value: number;
  handleInput: ChangeEventHandler<HTMLInputElement>;
}

export const RangeInput = ({
  name,
  min,
  max,
  step,
  orient,
  value,
  handleInput,
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
        onChange={handleInput}
      />
  );
};

interface NumberInputProps {
  name: string;
  value: number;
  handleInput: ChangeEventHandler<HTMLInputElement>;
}

export const NumberInput = ({ name, value, handleInput }: NumberInputProps) => {
  return (
    <input
      type="number"
      name={name}
      step="1"
      value={Math.round(value)}
      onChange={handleInput}
      style={{ width: "60px", textAlign: "center" }}
    />
  );
};
