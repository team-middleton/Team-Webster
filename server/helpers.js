const axios = require('axios');
const request = require('request-promise');
const SpotifyWebApi = require('spotify-web-api-node');

let helpers = {};

let config = {
 headers: {'Authorization': `token ${process.env.BEER_TOKEN || 'MDpmNmRjZGY5Yy0xNjVhLTExZTgtYmQ3MC00M2Y5NGU2MGJhOTg6YzVoQUVxOXg5ajBiOUUwcUFPb2pBZVNNUXVJYzZYdExvZDF5'}`}
};

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_CID || '2464c289439646d5bce72dcce92be15f',
  clientSecret : process.env.SPOTIFY_SECRET || '7039c64ea77940a0847d0cc619a28f3c',
  redirectUri : 'https://api.spotify.com/'
});

let random = function (arr) {
  var randomIndex = Math.floor((Math.random() * arr.length) + 0);
  return randomIndex;
};
//Music fetcher
helpers.getMusic = function(category, cb) {
// credentials are optional
  spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
        return spotifyApi.getPlaylistsForCategory(category, {country: 'US'})
    }).then(function(data) {
      cb(data.body);
  }, function(error) {
    throw error
  });
}

// //Helper function to randomie beer index

helpers.getBeer = function (ingredient, cb) {
  axios.get('https://lcboapi.com/products?q=' + ingredient, config)
  .then ((response) => {
      var beerArray = [];
      var randomBeer = random(response.data.result);
      var randomBeer2 = random(response.data.result);
      beerArray.push(response.data.result[randomBeer],response.data.result[randomBeer2]);
      cb(beerArray);
  })
  .catch ((error) => {
    throw error
  })

}

//Fetches cocktails based on "spirits (vodka, gin, etc.)" and returns cocktails.
helpers.getCocktails = function(ingredient) {
  const options = {
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient,
    method: 'GET'
  }
  return request(options);
}

//fetching information about a cocktail with ID
helpers.getCocktailsById = function(id) {
  const options = {
    url: 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id,
    method: 'GET'
  }
  return request(options);
}

helpers.filterIngredients = function(obj) {
  //for our data, the ingredients start at index = 9;
  var array = Object.keys(obj);
  var ingredientMeasurements = [];
  for (var i = 9; i < array.length - 1; i++) {
    if (obj[array[i]] !== null && obj[array[i]] !== '\r\n' && obj[array[i]].length > 1) {
      ingredientMeasurements.push(obj[array[i]] + ', ')
    }
  }
  return ingredientMeasurements;
}

module.exports.helpers = helpers;
