import React, { FunctionComponent, MouseEventHandler, useState } from "react";
import Canvas from "./Canvas";

const Draw: FunctionComponent = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [drawOn, setDrawOn] = useState(false);
  const [mouseDownCoordinates, setMouseDownCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [mouseMoveCoordinates, setMouseMoveCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (drawOn) {
      ctx.moveTo(mouseDownCoordinates.x, mouseDownCoordinates.y);
      ctx.lineTo(
        mouseMoveCoordinates.x - ctx.canvas.offsetLeft,
        mouseMoveCoordinates.y - ctx.canvas.offsetTop
      );
      setMouseDownCoordinates(mouseMoveCoordinates);
      ctx.stroke();
    }
  };

  const handleCanvasMouse: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (e.type === "mousedown") {
      setDrawOn(true);
      setMouseDownCoordinates({ x: e.clientX, y: e.clientY });
    }

    if (e.type === "mouseup") {
      setDrawOn(false);
      setMouseDownCoordinates({ x: 0, y: 0 });
    }

    if (e.type === "mousemove")
      setMouseMoveCoordinates({ x: e.pageX, y: e.pageY });
  };

  return (
    <Canvas
      draw={draw}
      width={canvasSize.width}
      height={canvasSize.height}
      handleCanvasMouse={handleCanvasMouse}
    />
  );
};

export default Draw;
