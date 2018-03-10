import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Drop from './components/Dropdown.jsx';
import Drinks from './components/Drinks.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Navigation from './components/Navigation.jsx'
import SpotifyPlayer from './components/Playlist.jsx';
import Chat from './components/Chat.jsx'
import { Message, Grid } from 'semantic-ui-react'
import YelpMap from './components/Map.jsx';
import ConcertsContainer from './components/ConcertsContainer.jsx';
import Intromodal from './components/Intromodal.jsx';
import ZipCodeRequest from './components/ZipCodeRequest.jsx';

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
      favoriteId: '',
      navColor: 'black',
      lat: 0, //40.7505788,
      long: 0,//-73.9765793,
      zipCode: 0,
      concerts: [],
      user: '',
      showIntroModal: true
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
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getConcerts = this.getConcerts.bind(this);
    this.setZipCode = this.setZipCode.bind(this); 
    this.setCategory = this.setCategory.bind(this);
    // this.toggleIntroModal = this.toggleIntroModal.bind(this)
  }

//this function, make requests to APIs for cocktails, beer, and wine, and playlist,\
//as well as change the background color of the nav bar.
  
  getAlcohols() {
    this.changeBackgroundColor();
		axios.post('/drinks', {alcohols: this.state.alcohols})
		.then((response) => {
			this.setState({
				drinks: response.data
			})
		})
		.catch((error) => {
			throw error;
    })
    console.log('state selected category ', this.state.selectedCategory)
    axios.post('/playlist', { category: this.state.selectedCategory })
      .then((response) => {
        this.setState({
          uriId: response.data.id
        })
      })
      .catch((error) => {
        throw error
      })
  }
//For each category, we predetermine a list of spirits together with wine or beer and set state,
//then call the function getAlcohols above which makes request to the APIs for cocktails, beer, and wine, as well as playlist
  settingAlcohols(category) {
    if (category === 'party') {
      this.setState({
        alcohols: ['tequila', 'vodka', 'rum']
      }, this.getAlcohols)
    } else if (category === 'classical') {
      this.setState({
        alcohols: [/*'white+wine', 'red+wine', */'whiskey', 'gin']
      }, this.getAlcohols)
    } else if (category === 'latin') {
      this.setState({
        alcohols: ['tequila', 'red+wine', 'gin']
      }, this.getAlcohols)
    } else if (category === 'chill') {
      this.setState({
        alcohols: ['whiskey', 'red+wine', 'gin']
      }, this.getAlcohols)
    } else if (category === 'country') {
      this.setState({
        alcohols: ['whiskey', 'rum', 'vodka']
      }, this.getAlcohols)
    };
  }
  //when the category is change and state is set,
  //call the settingAlcohots function above
  changeCategory(event) {
    this.setState({
      selectedCategory: event,
      showIntroModal: false
    }, () => {
      // THIS IS BROKEN; MUST FIX COCTAILS
      this.settingAlcohols(event);
      this.getConcerts();
    })
  }

  setCategory(event) {
    this.settingAlcohols(event);
    this.setState({
      selectedCategory: event,
      showIntroModal: false
    }, this.getPosition((pos) => {
      console.log('success', pos.coords);
      this.setState({ 
        lat: pos.coords.latitude, 
        long: pos.coords.longitude,
      }, () => {
        this.getConcerts();
      })
    }))
  }

  setZipCode(zip) {
    this.setState({
      zipCode: zip
    }, ()=> {
      this.getConcerts();
      console.log('new zip code state ', this.state.zipCode)
    })
  }

  getConcerts() { 
    axios.get('/upcomingEvents', {
      params: {
        category: this.state.selectedCategory,
        lat: this.state.lat,
        long: this.state.long,
        zip: this.state.zipCode
      }
    })
    .then((res) => {
      console.log('concert data in client gettin concerts ', res.data)
      this.setState({
        concerts: res.data
      })
    })
    .catch((err) => {
      console.log('err in client in getting concerts ', err);
    })
  }

  onLoginClick() {
    ReactDOM.render(<Login renderFavorite={this.renderFavorite} />, document.getElementById('app'));
  }

  onSignupClick() {
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  onLogoutClick() {
    axios.post('/logout')
      .then(() => {
        console.log("Logged Out!");
        this.setState({
          listOfFavorites: [],
          user: ''
        })
      })
      .catch((error) => {
        console.log("Failed to log out", error);
      })
  }
  //adding favorites drinks and playlist, call the onFavorite function below
  addFavorite() {
    // console.log(this.state.favorited);
    if (this.state.favorited === false) {
      this.setState({
        favorited: !this.state.favorited
      }, this.onFavorite);
    }
  }

  //this function make a post request to save favorited drinks and playlist
  onFavorite() {
    axios.post('/favorites', { drinks: this.state.drinks, playlist: this.state.uriId })
      .then(() => {
        this.setState({
          favorited: !this.state.favorited
        }, this.renderFavorite);
      })
      .catch((error) => {
        throw error;
      })
  }
//this function make request to get a list of saved playlists and drinks from the database
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
  //this is render the selected favorites
  obtainFavorite(userFaves){
      this.setState ({
      drinks: JSON.parse(userFaves.drinks),
      uriId: userFaves.music,
      favoriteId: userFaves.id
    })
  }

  componentDidMount() {
    console.log('component did mount')
    axios.get('/user')
    .then((response) => {
      console.log('user: ', response.data)
      this.setState({user: response.data})
    })
    .catch((err) => {
      console.error(err)
    })
    this.renderFavorite();
  }
  //this change the background color of the nav bar based on the selected mood
  changeBackgroundColor() {
    if (this.state.selectedCategory === 'party') {
      this.setState({
        navColor: 'yellow'
      })
    } else if (this.state.selectedCategory === 'latin') {
      this.setState({
        navColor: 'red'
      })
    } else if (this.state.selectedCategory === 'chill') {
        this.setState({
          navColor: 'violet'
        })
    } else if (this.state.selectedCategory === 'country') {
        this.setState({
          navColor: 'green'
        })
    } else if (this.state.selectedCategory === 'classical') {
        this.setState({
          navColor: 'teal'
        })
    }
  }
  //deleting favorites
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
  
  getPosition(callback) {
    navigator.geolocation.getCurrentPosition(callback);
  }

  render () {
    //place holder for when the drinks are not rendered
    let rightSide = null;
    if (this.state.drinks.length === 0) {
      rightSide = <Message size='massive' compact color='black'>
        <Message.Header>
          Welcome to our App!
        </Message.Header>
        <br />
        <Message.Item>
          Simply choose a <b>mood</b> up top and we will set the tone for you.
        </Message.Item>
        <br />
        <Message.Item>
          We have chosen what we think is the best playlist and drink pairings.
        </Message.Item>
        <br />
        <Message.Item>
          Enjoy!
        </Message.Item>
      </Message>;
    } else {
      rightSide = <Drinks drinks={this.state.drinks} />;
    }

    if (this.state.lat === 0 ) {
      var mapOrZipRequest = < ZipCodeRequest setZipCode={this.setZipCode} />
    } else {
      var mapOrZipRequest =      
        <div style={{ height: `400px` }}>
          <h1> Go check out these places to fit your mood!</h1>
            <YelpMap 
              category={this.state.selectedCategory}
              lat={this.state.lat}
              long={this.state.long}
            />  
        </div>
    }

  	return (
      <div> 
        <div>
      <Intromodal selectHandler={this.setCategory} />
      </div>
      <div>
        <Grid stackable>
          <Grid.Row columns={16}>
            <Navigation
              id='navbar'
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
              navColor={this.state.navColor}
              user={this.state.user}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Grid.Row>
                <div style={{margin:'0 auto', overflow:'auto'}}>
                  <SpotifyPlayer uri={'spotify:user:spotify:playlist:' + this.state.uriId} size={{width: 515, height: 400}} theme="black" view="list" />
                </div>
              </Grid.Row>
              <Grid.Row width={5}>
                
                  <ConcertsContainer concerts={this.state.concerts} className="concertsContainer"  />

              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={5}>
              <Grid.Row> 
                  {rightSide}
              </Grid.Row>
              <Grid.Row> 
                {mapOrZipRequest}
           
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={5}>
              <Grid.Row>
                <Chat mood={this.state.selectedCategory} user={this.state.user}/>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App


