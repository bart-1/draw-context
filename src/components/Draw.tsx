import React, {
  FunctionComponent,
  MouseEventHandler,
  useState,
} from "react";
import Canvas from "./Canvas";

const Draw: FunctionComponent = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
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
    ctx.moveTo(mouseDownCoordinates.x-ctx.canvas.clientLeft, mouseDownCoordinates.y-ctx.canvas.clientTop);
    ctx.lineTo(mouseMoveCoordinates.x, mouseMoveCoordinates.y);
  };

    const handleCanvasMouse: MouseEventHandler<HTMLCanvasElement> = (e) => {
      
    if (e.type === "mousedown")
      setMouseDownCoordinates({ x: e.clientX, y: e.clientY });

    if (e.type === "mouseup") setMouseDownCoordinates({ x: 0, y: 0 });

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
