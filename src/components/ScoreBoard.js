import { memo } from "react";
import PropTypes from "prop-types";
import "./ScoreBoard.css";

const ScoreBoard = ({ score }) => {
  return (
    <div>
      <p className="score-display">{score}</p>
    </div>
  );
};

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
};

export default memo(ScoreBoard);
