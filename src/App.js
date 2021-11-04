import { useEffect, useState } from "react";
import "./App.css";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/blank.png";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const isEmpty = (colorArrangement, index) => colorArrangement[index] === blank;
const setPositionEmpty = (colorArrangement, index) => {
  colorArrangement[index] = blank;
};
const getRandomColor = () => sample(candyColors);

const createBoard = () => new Array(width * width).fill().map(getRandomColor);

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState(() =>
    createBoard()
  );
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) =>
          setPositionEmpty(currentColorArrangement, square)
        );
        return true;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach((square) =>
          setPositionEmpty(currentColorArrangement, square)
        );
        return true;
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
        rowOfThree.forEach((square) =>
          setPositionEmpty(currentColorArrangement, square)
        );
        return true;
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
        rowOfFour.forEach((square) =>
          setPositionEmpty(currentColorArrangement, square)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= width * width - width; i++) {
      const isOnFirstRow = i < width;

      if (isOnFirstRow && isEmpty(currentColorArrangement, i)) {
        currentColorArrangement[i] = getRandomColor();
      }

      if (isEmpty(currentColorArrangement, i + width)) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        setPositionEmpty(currentColorArrangement, i);
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

  const ignore = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const handleDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const handleDragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];
    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();
    const squareBeingReplacedIdExists =
      typeof squareBeingReplacedId === "number";

    if (
      squareBeingReplacedIdExists &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onDragOver={ignore}
            onDragEnter={ignore}
            onDragLeave={ignore}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
