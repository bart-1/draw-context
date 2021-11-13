import React, { ChangeEventHandler } from 'react'

interface NumberInputProps {
  name: string;
  value: number;
  handleInput: ChangeEventHandler<HTMLInputElement>;
}
 
const NumberInput = ({ name, value, handleInput }: NumberInputProps) => {
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
 
export default NumberInput;