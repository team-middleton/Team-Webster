import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Dropdown from './components/Dropdown.jsx';
import Playlist from './components/Playlist.jsx';
import Drinks from './components/Drinks.jsx';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {

  	}
  }

  render () {
  	return (
      <div>
        <Dropdown />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));