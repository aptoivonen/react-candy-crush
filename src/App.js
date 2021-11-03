import { useEffect, useState } from "react";
import "./App.css";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomColor = () => sample(candyColors);

const createBoard = () => new Array(width * width).fill().map(getRandomColor);

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState(() =>
    createBoard()
  );

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = "")
        );
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = "")
        );
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < width * width; i++) {
      if (i % width > width - 3) {
        continue;
      }
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfThree.forEach((square) => (currentColorArrangement[square] = ""));
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < width * width; i++) {
      if (i % width > width - 4) {
        continue;
      }
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfFour.forEach((square) => (currentColorArrangement[square] = ""));
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < width * width - width; i++) {
      const isFirstRow = i < width;

      if (isFirstRow && currentColorArrangement[i] === "") {
        currentColorArrangement[i] = getRandomColor();
      }

      if (currentColorArrangement[i + width] === "") {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = "";
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

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
