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
  "brown",
  "Crimson",
  "DeepPink",
  "DarkKhaki",
  "DarkViolet",
  "SlateBlue",
  "Lime",
  "Olive",
  "LightSeaGreen",
  "Cyan",
  "Aquamarine",
  "SkyBlue",
  "DodgerBlue",
];

const Palette = ({ handleColorOnClick }: PaletteProps) => {
  const colorsPalette = colorsPaletteArr.map((color) => (
    <button
      key={color}
      name={color}
      style={{ backgroundColor: color, width: "40px", height: "40px" }}
      onClick={handleColorOnClick}></button>
  ));

  return <div className="palette">{colorsPalette}</div>;
};

export default Palette;
