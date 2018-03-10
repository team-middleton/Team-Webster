import React from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, defaultCenter, InfoWindow } from 'react-google-maps'; 

class YelpMap extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  yelpResponse: false,
  	  category: '',
  	  yelpList: [],
  	  itemClicked: 0,
  	  infoOpen: true
  	};
  	this.getYelp = this.getYelp.bind(this);
  	this.handleClick = this.handleClick.bind(this);
  }

  //query yelp api
  getYelp(category) {
    axios.post('/map', { 
      category: category,
      lat: this.props.lat,
      long: this.props.long
    })
    .then((res) => {
      console.log(res.data)
      this.setState({ yelpResponse: true, yelpList: res.data });
    })
	.catch((error) => {
	  throw error;
	});
  }

  //function to set state, change clicked
  handleClick(i, e) {
    this.setState({ itemClicked: i });
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
          itemClicked={this.state.itemClicked}
          handleClick={this.handleClick}
          yelpList={this.state.yelpList}
          lat={this.props.lat}
          long={this.props.long}
          infoOpen={this.state.infoOpen}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDu_83xpevHdDbkGIRm_wbY-6MtIT_b2cg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`}} />}
          mapElement={<div style={{ height: `100%` }}
          
          />}
   	    />
   	  );
    } else { return <div>Loading...</div> }
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
            onClick={() => { props.handleClick(i) }}
          >
            {i === props.itemClicked && (
              <InfoWindow 
                onCloseClick={props.onToggleOpen}
              >
              <div className="infoWindow">{place.name}
              <br />{place.location.address1}
              <br /><a target="_blank" href={place.url}>IS THIS PLACE ANY GOOD??</a>
              </div>
              </InfoWindow>
            )}
          </Marker> 
        );        
      })
    }
  </GoogleMap>
)));

export default YelpMap;
