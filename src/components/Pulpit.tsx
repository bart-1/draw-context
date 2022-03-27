import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import Canvas from "./Canvas";
import { ThicknessPalette, ColorPalette } from "./Palettes";
import { NumberInput, RangeInput } from "./Inputs";
import "../styles/Pulpit.css";

type DrawProps = {
  screenSizeValue: { x: number; y: number };
};

const Pulpit = ({ screenSizeValue }: DrawProps) => {
  const [canvasSize, setCanvasSize] = useState({
    width: screenSizeValue.x,
    height: screenSizeValue.y,
  });
  const [clearFlag, setClearFlag] = useState(false);
  const [colorOfTool, setColorOfTool] = useState("black");
  const [thicknessOfTool, setThicknessOfTool] = useState(5);
  const [toolboxMenu, setTollboxMenu] = useState("closed");
  const [drawOnFlag, setDrawOnFlag] = useState(false);

  useEffect(() => {
    setCanvasSize({ width: screenSizeValue.x, height: screenSizeValue.y });
  }, [screenSizeValue]);

  useEffect(() => {
    setTollboxMenu("closed");
  }, [drawOnFlag]);

  const handleColorOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setColorOfTool(e.currentTarget.name);
  };

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (
      e.currentTarget.name === "width" ||
      e.currentTarget.name === "range-width"
    )
      setCanvasSize((prevState) => ({
        width: e.target.valueAsNumber,
        height: prevState.height,
      }));

    if (
      e.currentTarget.name === "height" ||
      e.currentTarget.name === "range-height"
    )
      setCanvasSize((prevState) => ({
        width: prevState.width,
        height: e.target.valueAsNumber,
      }));
  };

  const handleThicknessOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setThicknessOfTool(Number(e.currentTarget.value));
  };

  /*
  this useEffect is because vertical range inputs in Firefox need orient attribute
  and typescript doesn't recognize it yet as proper attribute for this tag
  */
  useEffect(() => {
    const verticalInputRange = document.querySelector(
      "input[name=range-height]"
    );
    const horizontalInputRange = document.querySelector(
      "input[name=range-width]"
    );
    verticalInputRange?.setAttribute("orient", "vertical");
    horizontalInputRange?.setAttribute("orient", "horizontal");
  }, []);

  return (
    <div className="pulpit">
      <RangeInput
        name="range-width"
        min={375}
        max={screenSizeValue.x}
        step={5}
        orient={`veritcal`}
        value={canvasSize.width}
        handleInput={handleInput}
      />
      <div className="inline-keeper">
        <div className="tablet">
          <div className="tablet-top-menu">
            <div className="tablet-top-menu-section">
              <button
                id="tablet-toolbox-button"
                className="tablet-button"
                onClick={() =>
                  toolboxMenu === "closed"
                    ? setTollboxMenu("opened")
                    : setTollboxMenu("closed")
                }>
                Toolbox
              </button>
            </div>
            <div className="tablet-top-menu-section">
              <div
                className="tablet-actual-color-sample"
                style={{
                  backgroundColor: colorOfTool,
                }}></div>
            </div>
            <div className="tablet-top-menu-section">
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
            <div className="tablet-top-menu-section">
              <button
                id="tablet-clear-button"
                className="tablet-button"
                onClick={() => setClearFlag((prevState) => !prevState)}>
                Clear
              </button>
            </div>
          </div>

          <div className="tablet-canvas-section">
            <Canvas
              clearFlag={clearFlag}
              colorOfTool={colorOfTool}
              thicknessOfTool={thicknessOfTool}
              width={canvasSize.width}
              height={canvasSize.height}
              drawOnFlag={() => setDrawOnFlag((prevState) => !prevState)}
            />
            <div id="tablet-toolbox-menu" className={toolboxMenu}>
              <ColorPalette handleColorOnClick={handleColorOnClick} />
              <ThicknessPalette
                color={colorOfTool}
                handleThicknessOnClick={handleThicknessOnClick}
                thicknessOfTool={thicknessOfTool}
              />
            </div>
          </div>
        </div>
        <RangeInput
          name="range-height"
          min={305}
          max={screenSizeValue.y}
          step={5}
          orient="vertical"
          value={canvasSize.height}
          handleInput={handleInput}
        />
      </div>
    </div>
  );
};

export default Pulpit;
