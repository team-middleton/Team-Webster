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
  	  infoOpen: true,
  	  googLat: 0,
  	  googLong: 0,
  	  zipCode: 0
  	};
  	this.getYelp = this.getYelp.bind(this);
  	this.handleClick = this.handleClick.bind(this);
  }

  //query yelp api
  getYelp(category) {
    axios.post('/map', { 
      category: category,
      lat: this.props.lat,
      long: this.props.long,
      zipCode: this.props.zipCode
    })
    .then((res) => {
      console.log(res.data)
      this.setState({ yelpResponse: true, yelpList: res.data });
    })
	.catch((error) => {
	  throw error;
	});
  }

  getMapCoords(zip) {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zip)
    .then((res) => {
      console.log(res.data.results[0].geometry.location);
      this.setState({ googLat: res.data.results[0].geometry.location.lat, 
      	googLong: res.data.results[0].geometry.location.lng })
    })
  }

  //function to set state, change clicked
  handleClick(i, e) {
    this.setState({ itemClicked: i });
  }

  componentDidUpdate() {
  	if (this.state.category !== this.props.category || this.state.zipCode !== this.props.zipCode) {
  	  this.getYelp(this.props.category);
  	  this.getMapCoords(this.props.zipCode);
  	  this.setState({ category: this.props.category, zipCode: this.props.zipCode });
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
          googLat={this.state.googLat}
          googLong={this.state.googLong}
          zipCode={this.props.zipCode}
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
    center={props.zipCode === 0 ? { lat: props.lat, lng: props.long } : { lat: props.googLat, lng: props.googLong }}
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
