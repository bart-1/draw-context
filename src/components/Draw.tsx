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

type DrawProps = {
  screenSizeValue: { x: number; y: number };
};

const Draw = ({ screenSizeValue }: DrawProps) => {
  const [canvasSize, setCanvasSize] = useState({
    width: screenSizeValue.x,
    height: screenSizeValue.y,
  });
  const [drawOn, setDrawOn] = useState(false);
  const [mouseStartCoordinates, setMouseStartCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [mouseMoveCoordinates, setMouseMoveCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [colorOfTool, setColorOfTool] = useState("black");

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = colorOfTool;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (drawOn) {
      ctx.moveTo(
        mouseStartCoordinates.x - ctx.canvas.offsetLeft,
        mouseStartCoordinates.y - ctx.canvas.offsetTop
      );
      ctx.lineTo(
        mouseMoveCoordinates.x - ctx.canvas.offsetLeft,
        mouseMoveCoordinates.y - ctx.canvas.offsetTop
      );
      setMouseStartCoordinates(mouseMoveCoordinates);
      ctx.stroke();
      // setCanvasPicture(prevState => prevState.concat(ctx);
    }
  };
  useEffect(() => {
    setCanvasSize({ width: screenSizeValue.x, height: screenSizeValue.y });
  }, [screenSizeValue]);

  const handleCanvasMouse: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (e.type === "mousedown") {
      setDrawOn(true);
      setMouseStartCoordinates({ x: e.clientX, y: e.clientY });
    }

    if (e.type === "mouseup") {
      setDrawOn(false);
      setMouseStartCoordinates({ x: 0, y: 0 });
    }

    if (e.type === "mousemove")
      setMouseMoveCoordinates({ x: e.pageX, y: e.pageY });
  };
  const handleColorOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setColorOfTool(e.currentTarget.name);
    console.log(e.currentTarget.name);
  };

  const handleRangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
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

  return (
    <div className="draw">
      <div>
        <RangeInput
          name="width"
          min="200"
          max={screenSizeValue.x}
          step="5"
          orient="horizontal"
          value={canvasSize.width}
          handleRangeInput={handleRangeInput}
        />
      </div>
      <div className="horizontal-flex">
        <Canvas
          draw={draw}
          width={canvasSize.width}
          height={canvasSize.height}
          handleCanvasMouse={handleCanvasMouse}
        />
        <RangeInput
          name="height"
          min="200"
          max={screenSizeValue.y}
          step="5"
          orient="vertical"
          value={canvasSize.height}
          handleRangeInput={handleRangeInput}
        />
        <Palette handleColorOnClick={handleColorOnClick} />
      </div>
    </div>
  );
};

export default Draw;
