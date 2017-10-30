import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './controls/progressBar';

import './videoControls.css';

class VideoControls extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      progressPercentage: 0,
    };

    this.updateProgress = this.updateProgress.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.videoPlayerRef === null &&
      nextProps.videoPlayerRef !== null) {
      this.initControls(nextProps.videoPlayerRef);
    }
  }

  initControls(videoPlayerRef) {
    videoPlayerRef.addEventListener('timeupdate', this.updateProgress);
  }

  updateProgress() {
    const currentTime = this.props.videoPlayerRef.currentTime;
    const duration = this.props.videoPlayerRef.duration;
    const progressFraction = currentTime / duration;
    const progressPercentage = progressFraction * 100;
    this.setState({
      progressPercentage,
    });
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
            />
          </div>
          <ProgressBar
            progressPercentage={this.state.progressPercentage}
          />
        </div>
      </div>
    );
  }
}

VideoControls.propTypes = {
  videoPlayerRef: PropTypes.object,
};

export default VideoControls;
