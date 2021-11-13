import React, {
  MouseEventHandler,
  ReactEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import "../styles/Canvas.css";

type CanvasProps = {
  colorOfTool: string;
  height: number;
  thicknessOfTool: number;
  width: number;
};

const Canvas = ({
  colorOfTool,
  height,
  thicknessOfTool,
  width,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current.getContext("2d");
      if (canvas) draw(canvas);
    }
  }, [draw]);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchend", handleTouch);
  }, []);

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
    
    if (e.type === "touchmove")
    setDrawOn(true);
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
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleCanvasMouse}
        onMouseMove={handleCanvasMouse}
        onMouseUp={handleCanvasMouse}></canvas>
    </div>
  );
};

export default Canvas;
