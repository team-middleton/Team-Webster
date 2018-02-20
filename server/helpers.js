const axios = require('axios');
const token = require('../config.js');

let config = {
  headers: {'Authorization': `token ${token.TOKEN}`}
};

let helpers = {};

//Helper function to randomie beer index
let random = function(arr){
  var randomIndex =  Math.floor((Math.random() * arr.length) + 0);
  return randomIndex;
};
helpers.getBeer = function (cb) {
  axios.get('https://lcboapi.com/products?q=beer', config)
  .then ((response) => {
      var beerArray = [];
      var randomBeer = random(response.data.result);
      var randomBeer2 = random(response.data.result);   
      beerArray.push(response.data.result[randomBeer],response.data.result[randomBeer2]);   
      cb(beerArray);
  })
  .catch ((err) => {
    console.log(err);
  })

}

module.exports.helpers = helpers;