import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BufferedBar from './bufferedBar';

import './progressBar.css';

class ProgressBar extends Component {
  render() {

    const progressBarInnerStyle = {
      width: `${this.props.progressPercentage}%`,
    };

    return (
      <div className="progress-bar-container">
        <div className="progress-bar-outer"
          ref={this.props.saveProgressBarRef}
          onClick={this.props.onProgressBarClick}
        >
          <BufferedBar
            bufferedPercentage={this.props.bufferedPercentage}
          />
          <div
            style={progressBarInnerStyle}
            className="progress-bar-inner"
          />
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progressPercentage: PropTypes.number.isRequired,
  bufferedPercentage: PropTypes.number.isRequired,
  onProgressBarClick: PropTypes.func.isRequired,
  saveProgressBarRef: PropTypes.func.isRequired,
};

export default ProgressBar;
