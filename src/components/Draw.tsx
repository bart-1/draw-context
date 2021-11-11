import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import Canvas from "./Canvas";
import Palette from "./Palette";
import RangeInput from "./RangeInput";
import "../styles/Draw.css";
import LineThickness from "./LineThickness";

type DrawProps = {
  screenSizeValue: { x: number; y: number };
};

const Draw = ({ screenSizeValue }: DrawProps) => {
  const [canvasSize, setCanvasSize] = useState({
    width: screenSizeValue.x,
    height: screenSizeValue.y,
  });
  const [colorOfTool, setColorOfTool] = useState("black");
  const [thicknessOfTool, setThicknessOfTool] = useState(5);

  useEffect(() => {
    setCanvasSize({ width: screenSizeValue.x, height: screenSizeValue.y });
  }, [screenSizeValue]);

  const handleColorOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setColorOfTool(e.currentTarget.name);
    console.log(e.currentTarget.name);
  };

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.name === "width")
      setCanvasSize((prevState) => ({
        width: e.target.valueAsNumber,
        height: prevState.height,
      }));

    if (e.currentTarget.name === "height")
      setCanvasSize((prevState) => ({
        width: prevState.width,
        height: e.target.valueAsNumber,
      }));
  };

  const handleThicknessOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setThicknessOfTool(Number(e.currentTarget.value));
  };

  return (
    <>
      <div className="draw">
        <div>
          <RangeInput
            name="width"
            min={200}
            max={screenSizeValue.x}
            step={5}
            orient="horizontal"
            value={canvasSize.width}
            handleInput={handleInput}
          />
        </div>
        <div className="horizontal-flex">
          <Canvas
            colorOfTool={colorOfTool}
            thicknessOfTool={thicknessOfTool}
            width={canvasSize.width}
            height={canvasSize.height}
          />
          <RangeInput
            name="height"
            min={200}
            max={screenSizeValue.y}
            step={5}
            orient="vertical"
            value={canvasSize.height}
            handleInput={handleInput}
          />
        </div>
      </div>
      <div className="toolbox">
        <Palette handleColorOnClick={handleColorOnClick} />
        <div className="thickness">
          <LineThickness
            color={colorOfTool}
            handleThicknessOnClick={handleThicknessOnClick}
          />
        </div>
      </div>
    </>
  );
};

export default Draw;
