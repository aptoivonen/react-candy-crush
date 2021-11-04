import { memo } from "react";
import PropTypes from "prop-types";

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <p className="score-display">{score}</p>
    </div>
  );
};

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
};

export default memo(ScoreBoard);
