const axios = require('axios');
var zipcodes = require('zipcodes');

// object to assign params for the categories
const paramsObj = {
  party: 'danceclubs',
  chill: 'spas',
  classical: 'cocktail_bars',
  country: 'divebars',
  latin: 'latin'
};

const yelpAPI = 'x7T5oUXhDkDfOk2mt1wfFEwTswpx3XjIRpx_KzWdAiw-x4APiOyPlSzgDIZG-Epm7COaSs8xFxyEL56ISBKif8QjhOeepMK-8ZiRJUtoCFHWKxgGp02NXaOxAY2MWnYx';

// default location: lat: 40.7505788, long: -73.9765793 ?

const getYelp = function(category, lat, long, zipCode, callback) {
  if (zipCode !== 0) {
    lat = zipcodes.lookup(zipCode).latitude;
    long = zipcodes.lookup(zipCode).longitude;
  }
  axios.get('https://api.yelp.com/v3/businesses/search', {
  	headers: {
      Authorization: `Bearer ${yelpAPI}`
  	},
    params: {
      categories: paramsObj[category],
      limit: 10,
      latitude: lat,
      longitude: long
    }
  })
  .then((res) => {
  	const data = res.data.businesses;
  	callback(data);

  })
  .catch((err) => { console.log(err); });
}

module.exports.getYelp = getYelp;