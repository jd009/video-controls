import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './bufferedBar.css';

class BufferedBar extends Component {
  render() {
    const bufferedBarStyle = {
      width: `${this.props.bufferedPercentage}%`,
    };

    return (
      <div
        style={bufferedBarStyle}
        className="buffered-bar"
      />
    );
  }
}

BufferedBar.PropTypes = {
  bufferedPercentage: PropTypes.number.isRequired,
};

export default BufferedBar;
