import React from 'react';
import axios from 'axios';
import { Menu, Dropdown } from 'semantic-ui-react';
import Drop from './Dropdown.jsx'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Menu inverted fluid widths={3}>
        <Menu.Item>
          Favorites
        </Menu.Item>
        <Menu.Item>
          <Drop selectHandler = {this.props.selectHandler} category={this.props.category}/>
        </Menu.Item>
        <Menu.Item>
          <Dropdown item text='Login/Sign Up'>
            <Dropdown.Menu>
              <Dropdown.Item as='a' name='login' onClick={this.props.onLoginClick}>
                Login
              </Dropdown.Item>
              <Dropdown.Item as='a' name='signup' onClick={this.props.onSignupClick}>
                Sign Up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navigation
