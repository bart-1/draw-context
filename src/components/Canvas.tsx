import React, {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import "../styles/Canvas.css";

interface CanvasProps {
  draw: (canvas: CanvasRenderingContext2D) => void;
  height: number;
  width: number;
  handleCanvasMouse: MouseEventHandler<HTMLCanvasElement>;
}

const Canvas: FunctionComponent<CanvasProps> = ({
  draw,
  height,
  width,
  handleCanvasMouse,
}) => {
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
