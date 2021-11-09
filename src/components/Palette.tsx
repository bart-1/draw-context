import React, { MouseEventHandler } from "react";

interface PaletteProps {
  handleColorOnClick: MouseEventHandler<HTMLButtonElement>;
}

const colorsPaletteArr = [
  "white",
  "red",
  "green",
  "blue",
  "orange",
  "yellow",
  "black",
  "gray",
  "violet",
];

const Palette = ({ handleColorOnClick }: PaletteProps) => {
  const colorsPalette = colorsPaletteArr.map((color) => (
    <button
      key={color}
      name={color}
      style={{ backgroundColor: color, width: "30px", height: "30px" }}
      onClick={handleColorOnClick}></button>
  ));

  return <div>{colorsPalette}</div>;
};

export default Palette;
