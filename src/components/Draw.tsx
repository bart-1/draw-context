import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import Canvas from "./Canvas";
import { ThicknessPalette, ColorPalette } from "./Palettes";
import { NumberInput, RangeInput } from "./Inputs";
import "../styles/Draw.css";

import { IconContext } from "react-icons";
import { BsArrowBarUp } from "react-icons/bs";

type DrawProps = {
  screenSizeValue: { x: number; y: number };
};

const Draw = ({ screenSizeValue }: DrawProps) => {
  const [canvasSize, setCanvasSize] = useState({
    width: screenSizeValue.x,
    height: screenSizeValue.y,
  });
  const [clearFlag, setClearFlag] = useState(false);
  const [colorOfTool, setColorOfTool] = useState("black");
  const [thicknessOfTool, setThicknessOfTool] = useState(5);

  useEffect(() => {
    setCanvasSize({ width: screenSizeValue.x, height: screenSizeValue.y });
  }, [screenSizeValue]);

  const handleColorOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setColorOfTool(e.currentTarget.name);
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
          <div className="canvas-section">
            <div className="number-input">
              <div></div>
              <div>
                <NumberInput
                  name="width"
                  value={canvasSize.width}
                  handleInput={handleInput}
                />
                <span>{` x `}</span>
                <NumberInput
                  name="height"
                  value={canvasSize.height}
                  handleInput={handleInput}
                />
              </div>
              <div>
                <button
                  className="clear-button"
                  onClick={() => setClearFlag((prevState) => !prevState)}>
                  Clear
                </button>
              </div>
            </div>
            <Canvas
              clearFlag={clearFlag}
              colorOfTool={colorOfTool}
              thicknessOfTool={thicknessOfTool}
              width={canvasSize.width}
              height={canvasSize.height}
            />
          </div>
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
        <div className="toolbox-grip">
          <IconContext.Provider value={{ size: "40px" }}>
            <BsArrowBarUp />
          </IconContext.Provider>
        </div>
        <ColorPalette handleColorOnClick={handleColorOnClick} />
        <div className="thickness">
          <ThicknessPalette
            color={colorOfTool}
            handleThicknessOnClick={handleThicknessOnClick}
            thicknessOfTool={thicknessOfTool}
          />
        </div>
      </div>
    </>
  );
};

export default Draw;
