import React, { Component } from 'react';
import VideoControls from './videoControls';

import './videoPlayer.css';

class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      videoPlayerRef: null,
    };

    this.saveVideoPlayerRef = this.saveVideoPlayerRef.bind(this);
  }

  saveVideoPlayerRef(node) {
    this.setState({
      videoPlayerRef: node,
    });
  }

  render() {
    return (
      <div className={'video-container'}>
        <video
          className={'video-element'}
          ref={this.saveVideoPlayerRef}
          src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        />
        <VideoControls
          videoPlayerRef={this.state.videoPlayerRef}
        />
      </div>
    );
  }
}

export default VideoPlayer;
