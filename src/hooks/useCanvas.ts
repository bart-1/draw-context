import { useEffect, useRef } from "react";

const useCanvas = (draw: CallableFunction) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current.getContext("2d");
      if (canvas) draw(canvas);
    }
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
