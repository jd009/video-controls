import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './controls/progressBar/progressBar';
import CurrentTimeDisplay from './controls/currentTimeDisplay';
import Volume from './controls/volume';

import './videoControls.css';

class VideoControls extends Component {
  constructor(props, context) {
    super(props, context);

    this.progressBarRef = null;

    this.state = {
      currentTime: 0,
      progressPercentage: 0,
      bufferedPercentage: 0,
    };

    this.updateTime = this.updateTime.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.onProgressBarClick = this.onProgressBarClick.bind(this);
    this.saveProgressBarRef = this.saveProgressBarRef.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentWillUnmount() {
    if (this.props.videoPlayerRef) {
      this.props.videoPlayerRef.removeEventListener('timeupdate', this.updateTime);
      this.props.videoPlayerRef.removeEventListener('progress', this.updateProgress);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.videoPlayerRef === null &&
      nextProps.videoPlayerRef !== null) {
      this.initControls(nextProps.videoPlayerRef);
    }
  }

  initControls(videoPlayerRef) {
    videoPlayerRef.addEventListener('timeupdate', this.updateTime);
    videoPlayerRef.addEventListener('progress', this.updateProgress);
  }

  updateTime() {
    const currentTime = this.props.videoPlayerRef.currentTime;
    const duration = this.props.videoPlayerRef.duration;
    const progressFraction = currentTime / duration;
    const progressPercentage = progressFraction * 100;
    this.setState({
      currentTime,
      progressPercentage,
    });
  }

  updateProgress() {
    const bufferedTimeRanges = this.props.videoPlayerRef.buffered;
    const lastIndex = bufferedTimeRanges.length - 1;
    // Approximate all buffered ranges using last buffered range.
    const furthestBufferedTime = bufferedTimeRanges.end(lastIndex);
    const duration = this.props.videoPlayerRef.duration;
    const bufferedFraction = furthestBufferedTime / duration;
    const bufferedPercentage = bufferedFraction * 100;
    this.setState({
      bufferedPercentage,
    });
  }

  onProgressBarClick(event) {
    event.stopPropagation();

    if (this.progressBarRef === null ||
      this.props.videoPlayerRef ===  null) {
      return;
    }

    const totalWidth = this.progressBarRef.offsetWidth;
    const clickOffsetWidth = event.nativeEvent.offsetX;
    const positionFraction = (clickOffsetWidth / totalWidth);
    const newTime = positionFraction * this.props.videoPlayerRef.duration;
    this.props.videoPlayerRef.currentTime = newTime;
  }

  saveProgressBarRef(node) {
    this.progressBarRef = node;
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

  toggleMute(event) {
    event.stopPropagation();

    if (!this.props.videoPlayerRef) {
      return;
    }

    this.props.videoPlayerRef.muted = !this.props.videoPlayerRef.muted;
    this.forceUpdate();
  }

  render() {
    let playPauseIcon = null;
    if (this.props.videoPlayerRef && !this.props.videoPlayerRef.paused) {
      playPauseIcon = '||';
    } else {
      playPauseIcon = '&#9658;';
    }
    const isMuted = this.props.videoPlayerRef !== null &&
      this.props.videoPlayerRef.muted;
    return (
      <div className={'video-controls-container'}>
        <div className={'video-controls-bar'}>
          <div className="video-controls-play">
            <span className="play-icon"
              onClick={this.togglePlay}
              dangerouslySetInnerHTML={{__html: playPauseIcon}}
            />
          </div>
          <CurrentTimeDisplay
            currentTime={this.state.currentTime}
          />
          <ProgressBar
            progressPercentage={this.state.progressPercentage}
            bufferedPercentage={this.state.bufferedPercentage}
            onProgressBarClick={this.onProgressBarClick}
            saveProgressBarRef={this.saveProgressBarRef}
          />
          <Volume
            toggleMute={this.toggleMute}
            isMuted={isMuted}
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
