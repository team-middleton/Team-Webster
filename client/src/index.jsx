import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Dropdown from './components/Dropdown.jsx';
import Playlist from './components/Playlist.jsx';
import Drinks from './components/Drinks.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Navigation from './components/Navigation.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {

  	}
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }

  onLoginClick() {
    ReactDOM.render(<Login />, document.getElementById('app'));
  }

  onSignupClick() {
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  render () {
  	return (
      <div>
        <Navigation onSignupClick={this.onSignupClick} onLoginClick={this.onLoginClick} />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App
