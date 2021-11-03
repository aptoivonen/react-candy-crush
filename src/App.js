import { useState } from "react";
import "./App.css";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const getRandomColor = () =>
  candyColors[Math.floor(Math.random() * candyColors.length)];

const createBoard = () => new Array(width * width).fill().map(getRandomColor);

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState(() =>
    createBoard()
  );

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
