import React from 'react';
import axios from 'axios';

class YelpMap extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	};
  	//this.getPosition = this.getPosition.bind(this);
  }
  
  // getPosition() {
  // 	navigator.geolocation.getCurrentPosition((pos) => {
  //     console.log('success', pos.coords);
  //     this.setState({ lat: pos.coords.latitude, long: pos.coords.longitude });
  // 	}, (error) => {
  // 	  console.log('error', error);	
  // 	});
  // }

  componentDidMount() {
    //this.getPosition();
  }

  componentDidUpdate() {
    //make get request to /map ? 
    // axios.get('/map', { lat: this.props.lat, long: this.props.long, category: this.props.category })
    //   .then((res) => {
    //     // set state? 
    //   })
    //   .catch((err) => { console.log(err) });
  }

  render() { //render the map with pinned locations, conditional on this.props.category !== ''
  	if (this.props.category !== '') { return (<div>Pick a mood!</div>); }
    else {
  	  return (
        <div>

        </div>
  	  );
    }
  }
}

export default YelpMap;

//get geolocation
//once category selected:
//use this.props.category to query yelp
//query google maps with yelp results
//display on map

//write bottom-up, from yelp api call-> google map call
//app.js endpoint pass to helper functions



