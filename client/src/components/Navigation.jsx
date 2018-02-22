import React from 'react';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import Drop from './Dropdown.jsx'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Menu>
        <Drop selectHandler = {this.props.selectHandler} category={this.props.category}/>
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
