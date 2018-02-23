import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Drop from './components/Dropdown.jsx';
import Drinks from './components/Drinks.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Navigation from './components/Navigation.jsx'
import SpotifyPlayer from './components/Playlist.jsx';
import {Message, Grid} from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
			selectedCategory: '',
      drinks: [],
      alcohols: [],
      uriId: '37i9dQZF1DXcBWIGoYBM5M',
      favorited: false,
      listOfFavorites: [],
      favoriteId: ''
  	}
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.settingAlcohols = this.settingAlcohols.bind(this);
    this.getAlcohols = this.getAlcohols.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.onFavorite = this.onFavorite.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
    this.obtainFavorite = this.obtainFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  getAlcohols() {
		axios.post('/drinks', {alcohols: this.state.alcohols})
		.then((response) => {
      console.log("This is response data", response.data);
			this.setState({
				drinks: response.data
			})
		})
		.catch((error) => {
			throw error;
		})

    axios.post('/playlist', {category: this.state.selectedCategory})
    .then((response) => {
      this.setState({
        uriId: response.data.id
      })
    })
    .catch((error) => {
      throw error
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
		this.setState({
			selectedCategory: event
		}, this.settingAlcohols(event))
	}

  onLoginClick() {
    ReactDOM.render(<Login renderFavorite={this.renderFavorite}/>, document.getElementById('app'));
  }

  onSignupClick() {
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  onLogoutClick() {
    axios.post('/logout')
    .then(() => {
      console.log("Logged Out!");
      this.setState({
        listOfFavorites: []
      })
    })
    .catch((error) => {
      console.log("Failed to log out", error);
    })
  }

  addFavorite() {
    console.log(this.state.favorited);
    if (this.state.favorited === false) {
      this.setState({
        favorited: !this.state.favorited
      }, this.onFavorite);
    }
  }

  onFavorite() {
    axios.post('/favorites', {drinks: this.state.drinks, playlist: this.state.uriId})
    .then(() => {
      this.setState({
        favorited: !this.state.favorited
      }, this.renderFavorite);
    })
    .catch((error) => {
      throw error;
    })
  }

  renderFavorite() {
    axios.get('/favorites')
    .then((results) => {
      console.log("These are my results from renderFavorite", results.data);
      this.setState({
        listOfFavorites: results.data
      });
    })
    .catch((error) => {
      throw error;
    })
  }

  obtainFavorite(userFaves){
      this.setState ({
      drinks: JSON.parse(userFaves.drinks),
      uriId: userFaves.music,
      favoriteId: userFaves.id
    })
  }

  componentDidMount() {
    this.renderFavorite();
  }

  deleteFavorite() {
    if (this.state.favoriteId !== '') {
      axios.post('/delete', {favId: this.state.favoriteId})
      .then(() => {
        this.renderFavorite();
      })
      .catch((error) => {
        throw error;
      })
    }
  }

  render () {
    let rightSide = null;
    if(this.state.drinks.length === 0) {
      rightSide = <Message size='massive' compact color='black'>
        <Message.Header>
          Welcome to our App!
        </Message.Header>
        <br/>
        <Message.Item>
          Simply choose a <b>mood</b> up top and we will set the tone for you.
        </Message.Item>
        <br/>
        <Message.Item>
          We have chosen what we think is the best playlist and drink pairings.
        </Message.Item>
        <br/>
        <Message.Item>
          Enjoy!
        </Message.Item>
      </Message>;
    } else {
      rightSide = <Drinks drinks={this.state.drinks}/>;
    }
  	return (
        <Grid stackable>
          <Grid.Row columns={16} centered>
            <Navigation
              onSignupClick={this.onSignupClick}
              onLoginClick={this.onLoginClick}
              onLogoutClick={this.onLogoutClick}
              selectHandler={this.changeCategory}
              category={this.state.selectedCategory}
              drinks={this.state.drinks}
              addFavorite={this.addFavorite}
              favorited={this.state.favorited}
              renderFavorite={this.renderFavorite}
              listOfFavorites={this.state.listOfFavorites}
              obtainFavorite={this.obtainFavorite}
              deleteFavorite={this.deleteFavorite}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <div style={{margin:'0 auto', overflow:'auto'}}>
                <SpotifyPlayer uri={'spotify:user:spotify:playlist:' + this.state.uriId} size={{width: 800, height: 850}} theme="black" view="list" />
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              {rightSide}
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App
