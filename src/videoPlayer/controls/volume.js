import React from 'react';
import PropTypes from 'prop-types';

import SpeakerIcon from './icons/speakerIcon';
import SpeakerOffIcon from './icons/speakerOffIcon';
import './volume.css';

export default function Volume(props) {
  const {
    toggleMute,
    isMuted,
  } = props;

  let volumeIcon = null;
  if (isMuted) {
    volumeIcon = <SpeakerOffIcon />;
  } else {
    volumeIcon = <SpeakerIcon />;
  }

  return (
    <div
      className="volume-container"
      onClick={toggleMute}
    >
      {volumeIcon}
    </div>
  );
}

Volume.propTypes = {
  toggleMute: PropTypes.func.isRequired,
  isMuted: PropTypes.bool,
};
