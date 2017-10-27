import React, { Component } from 'react';

import './videoPlayer.css';

class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    this.videoPlayerRef = null;

    this.saveVideoPlayerRef = this.saveVideoPlayerRef.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    if (!this.videoPlayerRef) {
      return;
    }

    if (this.videoPlayerRef.paused) {
      this.videoPlayerRef.play();
    } else {
      this.videoPlayerRef.pause();
    }
  }

  saveVideoPlayerRef(node) {
    this.videoPlayerRef = node;

  }

  render() {
    return (
      <div className={'video-container'}>
        <video
          className={'video-element'}
          ref={this.saveVideoPlayerRef}
          src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        />
        <div className={'video-controls-container'}
          onClick={this.togglePlay}
        >
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
