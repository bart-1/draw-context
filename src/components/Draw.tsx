import React, { FunctionComponent, useState } from "react";
import Canvas from "./Canvas";


const Draw: FunctionComponent = () => {
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);

  const draw = (ctx: CanvasRenderingContext2D) => {
    console.log("test");
  };

    return <Canvas draw={draw} width={width} height={height}/>;
};

export default Draw;
