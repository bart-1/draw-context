import React, { MouseEventHandler } from "react";
import "../styles/Palettes.css";

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

export const ColorPalette = ({ handleColorOnClick }: PaletteProps) => {
  const colorsPalette = colorsPaletteArr.map((color) => (
    <button
      key={color}
      name={color}
      style={{
        backgroundColor: color,
        width: "3vh",
        height: "3vh",
      }}
      onClick={handleColorOnClick}></button>
  ));

  return <div className="palette">{colorsPalette}</div>;
};

interface ThicknessProps {
  handleThicknessOnClick: MouseEventHandler<HTMLButtonElement>;
  color: string;
  thicknessOfTool: number;
}

const thickness = [5, 10, 15, 20, 25, 30, 40, 50];

export const ThicknessPalette = ({
  handleThicknessOnClick,
  color,
  thicknessOfTool,
}: ThicknessProps) => {
  const thicknessPalette = thickness.map((thickness) => (
    <button
      className={thicknessOfTool === thickness ? "active-tool" : ""}
      key={thickness}
      value={thickness}
      style={{
        padding: "0",
        borderRadius: "50%",
        backgroundColor: color,
        width: `${thickness}px`,
        height: `${thickness}px`,
        marginRight: "10px",
        marginTop: "10px",
      }}
      onClick={handleThicknessOnClick}></button>
  ));

  return <div className="thickness">{thicknessPalette}</div>;
};
