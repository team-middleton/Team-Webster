import React, { Component } from 'react';
import PropTypes from 'prop-types';


const sizePresets = {
  large: {
    width: 300,
    height: 380,
  },
  compact: {
    width: 300,
    height: 80,
  },
};

//This renders the Spotify playlist component
//In order for the playlist to render it takes in a "URI" which is a link that is given by the spotify API.
class SpotifyPlayer extends Component {

  render() {
    const { uri, view, theme } = this.props;
    let { size } = this.props;

    if (typeof size === 'string') {
      size = sizePresets[size];
    }

    return (
      <div className = "player">
      <iframe
        title="Spotify"
        src={`https://embed.spotify.com/?uri=${uri}&view=${view}&theme=${theme}`}
        width={size.width}
        height={size.height}
        frameBorder="0"
        allowTransparency="true"
      />
      </div>
    );
  }

}

SpotifyPlayer.propTypes = {

  // Spotify URI
  uri: PropTypes.string.isRequired,

  // View
  view: PropTypes.oneOf(['list', 'coverart']),

  // Theme
  theme: PropTypes.oneOf(['black', 'white']),
};

SpotifyPlayer.defaultProps = {
  size: 'large',
  view: 'list',
  theme: 'black',
};

export default SpotifyPlayer;
