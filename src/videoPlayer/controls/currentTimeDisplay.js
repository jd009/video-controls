import React from 'react';
import PropTypes from 'prop-types';

import './currentTimeDisplay.css';

function formatCurrentTime(currentTimeInSec) {
  const minutes = Math.floor(currentTimeInSec / 60);
  let seconds = Math.floor(currentTimeInSec - (minutes * 60));
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const currentTime = `${minutes}:${seconds}`;
  return currentTime;
}

function CurrentTimeDisplay(props) {
  const {
    currentTime,
  } = props;
  const formattedCurrentTime = formatCurrentTime(currentTime);

  return (
    <div className="current-time-container">
      <span className="current-time-text">
        {formattedCurrentTime}
      </span>
    </div>
  );
}

CurrentTimeDisplay.propTypes = {
  currentTime: PropTypes.number,
};

export default CurrentTimeDisplay;
