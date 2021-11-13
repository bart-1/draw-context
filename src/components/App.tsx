import React, { useEffect, useState } from "react";
import Draw from "./Draw";
import "../styles/App.css";

const screenFactor = 0.85;

function App() {
  const [screenSizeValue, setScrenSizeValue] = useState({
    x: window.innerWidth * screenFactor,
    y: window.innerHeight * screenFactor,
  });

  useEffect(() => {
    const reloadScreenSizeValue = () => {
      setScrenSizeValue({
        x: window.innerWidth * screenFactor,
        y: window.innerHeight * screenFactor,
      });
    };

    window.addEventListener("resize", reloadScreenSizeValue);
    return () => window.removeEventListener("resize", reloadScreenSizeValue);

    
  }, []);

  return (
    <div className="App">
      <Draw screenSizeValue={screenSizeValue} />
    </div>
  );
}

export default App;
