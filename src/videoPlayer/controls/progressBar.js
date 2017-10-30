import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './progressBar.css';

class ProgressBar extends Component {
  render() {

    const progressBarInnerStyle = {
      width: `${this.props.progressPercentage}%`,
    };

    return (
      <div className="progress-bar-container">
        <div className="progress-bar-outer">
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
};

export default ProgressBar;
