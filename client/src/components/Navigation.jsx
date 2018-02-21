import React from 'react';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import Dropdown from './Dropdown.jsx'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Menu>
        <Dropdown />
        <Menu.Menu position='right'>
          <Menu.Item as='a' name='login' onClick={this.props.onLoginClick}>
            Login
          </Menu.Item>
          <Menu.Item as='a' name='signup' onClick={this.props.onSignupClick}>
            Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navigation
