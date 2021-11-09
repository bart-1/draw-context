<<<<<<< HEAD
import React, { MouseEventHandler, useState } from "react";
=======
import React, {
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useState,
} from "react";
>>>>>>> 84dc1773f86dfcdcf0c595a87d34e42cf3bd5ffa
import Canvas from "./Canvas";
import Palette from "./Palette";
import RangeInput from "./RangeInput";

<<<<<<< HEAD
const Draw = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
=======
const Draw: FunctionComponent = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 100, height: 1000 });
>>>>>>> 84dc1773f86dfcdcf0c595a87d34e42cf3bd5ffa
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
        width: Number(e.currentTarget.value),
        height: prevState.height,
      }));

    if (e.currentTarget.name === "height")
      setCanvasSize((prevState) => ({
        width: prevState.width,
        height: Number(e.currentTarget.value),
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
        min="30vh"
        max="80vh"
        step="5vh"
        orient="hotizontal"
        value={canvasSize.width}
        handleRangeInput={handleRangeInput}
      />
      <RangeInput
        name="height"
        min="30vh"
        max="80vh"
        step="5vh"
        orient="vertical"
        value={canvasSize.height}
        handleRangeInput={handleRangeInput}
      />
    </div>
  );
};

export default Draw;
