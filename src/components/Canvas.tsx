import React, {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import "../styles/Canvas.css";

type CanvasProps = {
  draw: (canvas: CanvasRenderingContext2D) => void;
  height: number;
  width: number;
  handleCanvasMouse: MouseEventHandler<HTMLCanvasElement>;
}

const Canvas= ({
  draw,
  height,
  width,
  handleCanvasMouse,
}:CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current.getContext("2d");
      if (canvas) draw(canvas);
    }
  }, [draw]);

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
