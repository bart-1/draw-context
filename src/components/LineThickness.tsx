import React, { MouseEventHandler } from "react";

interface ThicknessProps {
  handleThicknessOnClick: MouseEventHandler<HTMLButtonElement>;
  color: string;
  thicknessOfTool: number;
}

const thickness = [5, 10, 15, 20, 25, 30, 40, 50];

const LineThickness = ({ handleThicknessOnClick, color, thicknessOfTool }: ThicknessProps) => {
  const thicknessPalette = thickness.map((thickness) => (
    <button
      className={thicknessOfTool === thickness ? 'active-tool' : ''}
      key={thickness}
      value={thickness}
      style={{
        padding: "0",
        borderRadius: "50%",
        backgroundColor: color,
        width: `${thickness}px`,
        height: `${thickness}px`,
        marginRight: "10px",
      }}
      onClick={handleThicknessOnClick}></button>
  ));

  return <div className="thickness">{thicknessPalette}</div>;
};

export default LineThickness;
