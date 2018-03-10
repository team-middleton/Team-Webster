import React from 'react';
import axios from 'axios';
import { Menu, Dropdown, Icon, Popup } from 'semantic-ui-react';
import Drop from './Dropdown.jsx'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    //This conditionally renders the heart icon to go from empty to a filled in a heart.
    let heartState;
    if (this.props.favorited === false) { 
      heartState = <Icon className='empty heart'></Icon>
    } else {
      heartState = <Icon className='heart'></Icon>
    }
    
    //This renders the list of favorites. If there are no favorites then the drop down shows "No Favorites"
    //Else it will populate the favorites dropdown with the list of favorites stored in the database.
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
    if(this.props.user === '') {
      var dropdownText = 'Login/Sign Up'
    } else {
      var dropdownText = 'Log out'
    }
    return (
      <Menu borderless inverted fluid color={this.props.navColor} style={{height: '50px'}}>
        <Menu.Item position="left" className='menuLogo'>Drinqify</Menu.Item>
        <Menu.Item position="center">
          <Drop selectHandler = {this.props.selectHandler} category={this.props.category}/>
        </Menu.Item>
        <Menu.Item position="right">
          {console.log('user', this.props.user)}
          {this.props.user !== '' ? (
            <Menu.Item>Hi, {this.props.user}!</Menu.Item>
            ) : <div></div>
          }

          {this.props.user !== '' ? (
          <Menu.Item onClick={this.props.addFavorite}>
            {heartState}
          </Menu.Item> ) : <div></div>}
          {this.props.user !== '' ? (
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
           ) : <div></div>}

          <Dropdown item text={dropdownText}>
            <Dropdown.Menu>
              {this.props.user === '' ? (<Dropdown.Item as='a' name='login' onClick={this.props.onLoginClick}>
                Login
              </Dropdown.Item>) : <div> </div>}

              {this.props.user === '' ? (<Dropdown.Item as='a' name='signup' onClick={this.props.onSignupClick}>
                Sign Up
              </Dropdown.Item>) : <div></div>}
              
              {this.props.user !== '' ? (<Popup
                  trigger={<Dropdown.Item as='a' name='logout' onClick={this.props.onLogoutClick}>Logout</Dropdown.Item>}
                  content='You have logged out!'
                  on='click'
                  position='top right'
                  basic
                  hideOnScroll
                />): <div></div>}
                
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navigation
