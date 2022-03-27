import React, { MouseEventHandler, useEffect, useState } from "react";
import "../styles/Canvas.css";

import useCanvas from "../hooks/useCanvas";

type CanvasProps = {
  clearFlag: boolean;
  colorOfTool: string;
  height: number;
  thicknessOfTool: number;
  width: number;
  drawOnFlag: CallableFunction;
};

const Canvas = ({
  clearFlag,
  colorOfTool,
  height,
  thicknessOfTool,
  width,
  drawOnFlag,
}: CanvasProps) => {
  const [drawOn, setDrawOn] = useState(false);
  const [mouseStartCoordinates, setMouseStartCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [mouseMoveCoordinates, setMouseMoveCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = colorOfTool;
    ctx.lineWidth = thicknessOfTool;
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
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchend", handleTouch);
  }, []);

  useEffect(() => {
    drawOnFlag();
  }, [drawOn]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.getContext("2d");
      canvas?.clearRect(0, 0, width, height);
    }
  }, [clearFlag]);

  const handleTouch = (e: TouchEvent) => {
    if (e.type === "touchstart") {
      setMouseStartCoordinates({
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      });
    }

    if (e.type === "touchend") {
      setDrawOn(false);
      setMouseStartCoordinates({ x: 0, y: 0 });
    }

    if (e.type === "touchmove") setDrawOn(true);
    setMouseMoveCoordinates({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    });
  };

  const handleCanvasMouse: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (e.type === "mousedown") {
      setMouseStartCoordinates({ x: e.clientX, y: e.clientY });
      setDrawOn(true);
    }

    if (e.type === "mouseup") {
      setDrawOn(false);
      setMouseStartCoordinates({ x: 0, y: 0 });
    }

    if (e.type === "mousemove")
      setMouseMoveCoordinates({ x: e.clientX, y: e.clientY });
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleCanvasMouse}
      onMouseMove={handleCanvasMouse}
      onMouseUp={handleCanvasMouse}></canvas>
  );
};

export default Canvas;
