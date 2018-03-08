const axios = require('axios');

// object to assign params for the categories
const paramsObj = {
  party: 'danceclubs',
  chill: 'spas',
  classical: 'cocktail_bars',
  rock: 'divebars',
  romance: 'wine_bars'
};

const yelpAPI = 'x7T5oUXhDkDfOk2mt1wfFEwTswpx3XjIRpx_KzWdAiw-x4APiOyPlSzgDIZG-Epm7COaSs8xFxyEL56ISBKif8QjhOeepMK-8ZiRJUtoCFHWKxgGp02NXaOxAY2MWnYx';

// default location: lat: 40.7505788, long: -73.9765793 ?

const getYelp = function(category, lat, long, callback) {
  console.log('category', category)
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