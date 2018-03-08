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

  /* yelp data: 
categories:
(3) [{…}, {…}, {…}]
coordinates:
{latitude: 40.7300334907642, longitude: -73.9818279024468}
display_phone:
"(212) 478-3021"
distance:
2326.933371257446
id:
"keybar-new-york"
image_url:
"https://s3-media1.fl.yelpcdn.com/bphoto/KyJKehujQmJiIVKeyKJmXg/o.jpg"
is_closed:
false
location:
{address1: "432 E 13th St", address2: "", address3: "", city: "New York", zip_code: "10009", …}
name:
"Keybar"
phone:
"+12124783021"
price:
"$"
rating:
4
review_count:
523
transactions:
[]
url:
"https://www.yelp.com/biz/keybar-new-york?adjust_creative=uMSAdHu0SdwsS90Ua44vlw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uMSAdHu0SdwsS90Ua44vlw"
  */

  componentDidMount() {
    //this.getYelp(this.props.category);
  }

  componentDidUpdate() {
  	if (this.state.category !== this.props.category) {
  	  this.getYelp(this.props.category);
  	  this.setState({ category: this.props.category });
  	}
  }

  render() {
  	//console.log(this.state.yelpList)
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
    defaultZoom={9}
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
/*
    <Marker
      position={{ lat: props.lat, lng: props.long }}
    />

  {props.isMarkerShown && 
    props.businesses.map((business, i) => {
        var letter =  String.fromCharCode(65 + i);
        if (props.hovered === i) {


          return ( <Marker 
          animation = {google.maps.Animation.BOUNCE}
          key={props.businesses[i].name}
          position={{ lat: props.businesses[i].coordinates.latitude, lng: props.businesses[i].coordinates.longitude }} 
        />)
        } else {
          return ( <Marker 
          label= {letter}
          key={props.businesses[i].name}
          position={{ lat: props.businesses[i].coordinates.latitude, lng: props.businesses[i].coordinates.longitude }} 
        />)
        }
    })
  }

*/
