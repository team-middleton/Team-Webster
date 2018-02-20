import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Dropdown from './components/Dropdown.jsx';
import Playlist from './components/Playlist.jsx';
import Drinks from './components/Drinks.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';

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
        <Signup />
        <Login />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
