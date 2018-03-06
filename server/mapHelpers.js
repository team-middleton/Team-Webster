const axios = require('axios');

// object to assign params for the categories
const paramsObj = {
  party: 'danceclubs',
  chill: 'spas',
  classical: 'cocktail_bars',
  rock: 'divebars',
  romance: 'wine_bars'
};

const getYelp = function(category, lat, long) {
  
  axios.get('https://api.yelp.com/v3/businesses/search', {
  	headers: {
      Authorization: 'Bearer x7T5oUXhDkDfOk2mt1wfFEwTswpx3XjIRpx_KzWdAiw-x4APiOyPlSzgDIZG-Epm7COaSs8xFxyEL56ISBKif8QjhOeepMK-8ZiRJUtoCFHWKxgGp02NXaOxAY2MWnYx'
  	},
    params: {
      categories: paramsObj[category],
      limit: 5,
      latitude: lat,
      longitude: long
    }
  })
  .then((res) => {
  	console.log(response)
  })
  .catch((err) => { console.log(err); });
}

// yelpAPI: 'x7T5oUXhDkDfOk2mt1wfFEwTswpx3XjIRpx_KzWdAiw-x4APiOyPlSzgDIZG-Epm7COaSs8xFxyEL56ISBKif8QjhOeepMK-8ZiRJUtoCFHWKxgGp02NXaOxAY2MWnYx'
// location: lat: 40.7505788, long: -73.9765793

const getMap = function(category, lat, long, callback) {
  //getYelp(category, lat, long);
}

module.exports.getMap = getMap;