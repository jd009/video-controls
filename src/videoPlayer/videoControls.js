import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './videoControls.css';

class VideoControls extends Component {
  constructor(props, context) {
    super(props, context);

    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay(event) {
    event.stopPropagation();

    if (!this.props.videoPlayerRef) {
      return;
    }

    if (this.props.videoPlayerRef.paused) {
      this.props.videoPlayerRef.play();
    } else {
      this.props.videoPlayerRef.pause();
    }
    this.forceUpdate();
  }

  render() {
    let playPauseIcon = null;
    if (this.props.videoPlayerRef && !this.props.videoPlayerRef.paused) {
      playPauseIcon = '||';
    } else {
      playPauseIcon = '&#9658;';
    }
    return (
      <div className={'video-controls-container'}
        onClick={this.togglePlay}
      >
        <div className={'video-controls-bar'}>
          <div className="video-controls-play">
            <span className="play-icon"
              onClick={this.togglePlay}
              dangerouslySetInnerHTML={{__html: playPauseIcon}}
            >
            </span>
          </div>
        </div>
      </div>
    );
  }
}

VideoControls.propTypes = {
  videoPlayerRef: PropTypes.object,
};

export default VideoControls;
