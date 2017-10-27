import React, { Component } from 'react';
import VideoPlayer from './videoPlayer/videoPlayer.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Custom Video Controls</h1>
        </header>
        <div className={'app-container'}>
          <VideoPlayer />
        </div>
      </div>
    );
  }
}

export default App;
