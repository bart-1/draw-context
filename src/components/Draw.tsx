import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";

import Canvas from "./Canvas";
import Palette from "./Palette";
import RangeInput from "./RangeInput";

const Draw = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [canvasPicture, setCanvasPicture] = useState([]);

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
    <div>
      <Canvas
        draw={draw}
        width={canvasSize.width}
        height={canvasSize.height}
        handleCanvasMouse={handleCanvasMouse}
      />
      <Palette handleColorOnClick={handleColorOnClick} />
      <RangeInput
        name="width"
        min="100"
        max="800"
        step="20"
        // orient="hotizontal"
        value={canvasSize.width}
        handleRangeInput={handleRangeInput}
      />
      <RangeInput
        name="height"
        min="100"
        max="800"
        step="20"
        // orient="vertical"
        value={canvasSize.height}
        handleRangeInput={handleRangeInput}
      />
    </div>
  );
};

export default Draw;
