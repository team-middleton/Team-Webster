import React from 'react';
import axios from 'axios';
import { Menu, Dropdown, Icon, Popup } from 'semantic-ui-react';
import Drop from './Dropdown.jsx'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let heartState;
    if (this.props.favorited === false) {
      heartState = <Icon className='empty heart'></Icon>
    } else {
      heartState = <Icon className='heart'></Icon>
    }
    let favorites;
    if (this.props.listOfFavorites.length === 0) {
      favorites = <Dropdown.Item>No Favorites</Dropdown.Item>
    } else {
      favorites = this.props.listOfFavorites.map((item, i) =>
        <Dropdown.Item onClick= {() => {this.props.obtainFavorite(item)}}
         as='a' key={i} >{'Favorite ' + (i + 1)}
       </Dropdown.Item>
      )
    }

    return (
      <Menu inverted fluid widths={3} color={this.props.navColor}>
        <Menu.Item>
          <Menu.Item onClick={this.props.addFavorite}>
            {heartState}
          </Menu.Item>
          <Dropdown item text='Favorites'>
            <Dropdown.Menu>
              {favorites}
              <Dropdown.Divider />
              <Popup
                trigger={<Dropdown.Item onClick={this.props.deleteFavorite}>Delete Current Favorite</Dropdown.Item>}
                content='This Favorited Combination Has Been Deleted'
                on='click'
                position='top left'
                basic
                hideOnScroll
              />
            </Dropdown.Menu>
          </Dropdown>
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
                <Popup
                  trigger={<Dropdown.Item as='a' name='logout' onClick={this.props.onLogoutClick}>Logout</Dropdown.Item>}
                  content='You have logged out!'
                  on='click'
                  position='top right'
                  basic
                  hideOnScroll
                />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navigation
