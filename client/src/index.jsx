import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Drop from './components/Dropdown.jsx';
import Drinks from './components/Drinks.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Navigation from './components/Navigation.jsx'
import SpotifyPlayer from './components/Playlist.jsx';
import {Button, Form, Grid} from 'semantic-ui-react'



class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
			selectedCategory: '',
      drinks: [],
      alcohols: [],
      uriId: ''
  	}
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.settingAlcohols = this.settingAlcohols.bind(this);
    this.getAlcohols = this.getAlcohols.bind(this);
  }

  getAlcohols() {
		axios.post('/drinks', {alcohols: this.state.alcohols})
		.then((response) => {
			this.setState({
				drinks: response.data
			})
			console.log('CLIENT SIDE DATA', response.data);
		})
		.catch((err) => {
			console.log(err);
		})

    axios.post('/playlist', {category: this.state.selectedCategory})
    .then((response) => {
      console.log("This is the playlist", response);
      this.setState({
        uriId: response.data.id
      })
    })
    .catch((error) => {
      console.log("this is the playlist", error);
    })
	}

  settingAlcohols(category) {
		if (category === 'party') {
			this.setState({
				alcohols: ['tequila', 'vodka', 'rum', 'beer']
			}, this.getAlcohols)
		} else if (category === 'classical') {
			this.setState({
				alcohols: ['white+wine', 'red+wine', 'whiskey', 'gin']
			}, this.getAlcohols)
		} else if (category === 'romance') {
			this.setState({
				alcohols: ['red+wine', 'white+wine', 'gin']
			}, this.getAlcohols)
		} else if (category === 'chill') {
			this.setState({
				alcohols: ['whiskey', 'red+wine', 'beer']
			}, this.getAlcohols)
		} else if (category === 'rock') {
			this.setState({
				alcohols: ['whiskey', 'tequila', 'vodka', 'rum', 'gin']
			}, this.getAlcohols)
		};
	}

  changeCategory(event) {
		console.log(event)
		this.setState({
			selectedCategory: event
		}, this.settingAlcohols(event))
	}

  onLoginClick() {
    ReactDOM.render(<Login />, document.getElementById('app'));
  }

  onSignupClick() {
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  render () {
  	return (
        <Grid>
          <Grid.Row columns={16} centered>
            <Navigation onSignupClick={this.onSignupClick} onLoginClick={this.onLoginClick} selectHandler={this.changeCategory} category={this.state.selectedCategory} drinks={this.state.drinks}/>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <SpotifyPlayer uri={'spotify:user:spotify:playlist:' + this.state.uriId} size={{width: 800, height: 500}} theme="white" view="list" />
            </Grid.Column>
            <Grid.Column width={8}>
              <Drinks drinks={this.state.drinks}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App
