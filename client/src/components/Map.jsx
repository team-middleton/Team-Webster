import React from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker , defaultCenter} from 'react-google-maps'; 


class YelpMap extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  yelpResponse: false,
  	  category: '',
  	  yelpList: []
  	};
  	this.getYelp = this.getYelp.bind(this);
  }

  //query yelp api
  getYelp(category) {
    axios.post('/map', { 
      category: category,
      lat: this.props.lat,
      long: this.props.long
    })
    .then((res) => {
      console.log('yelp response', res);
      this.setState({ yelpResponse: true, yelpList: res.data });
    })
	.catch((error) => {
	  throw error;
	});
  }

  componentDidUpdate() {
  	if (this.state.category !== this.props.category) {
  	  this.getYelp(this.props.category);
  	  this.setState({ category: this.props.category });
  	}
  }

  render() {
  	if (this.state.yelpResponse) {
      return (
   	    <MapComponent 
          isMarkerShown
          yelpList={this.state.yelpList}
          lat={this.props.lat}
          long={this.props.long}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDu_83xpevHdDbkGIRm_wbY-6MtIT_b2cg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`}} />}
          mapElement={<div style={{ height: `100%` }}/>}
   	    />
   	  );
    } else { return <div>choose a mood!</div> }
  }
}

const MapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 40.755603, lng: -73.984931 }}
    center={{ lat: props.lat, lng: props.long }}
  >
    {
      props.isMarkerShown && props.yelpList.map((place, i) => {
        return (
          <Marker
            key={i}
            position={{ lat: place.coordinates.latitude, lng: place.coordinates.longitude}}
          /> 
        );
      })

    }
  </GoogleMap>
)));

export default YelpMap;
