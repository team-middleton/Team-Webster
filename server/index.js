var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var db = require('../database/database.js');
var helpers = require('./helpers.js').helpers

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


let random = function (arr) {
  var randomIndex = Math.floor((Math.random() * arr.length) + 0);
  return randomIndex;
};

app.post('/drinks', function (req, res) {
  var drinksToClient = [];
  for (var i = 0; i < req.body.alcohols.length; i++) {
    if (req.body.alcohols[i] !== 'beer' || req.body.alcohols[i] !== 'white+wine' || req.body.alcohols[i] !== 'red+wine') {
      helpers.getCocktails(req.body.alcohols[i])
        .then((data) => {
          return JSON.parse(data); 
        })
        .then((cocktailInfo) => {
          var randomIndex = Math.floor((Math.random() * cocktailInfo.drinks.length));
          return cocktailInfo.drinks[randomIndex].idDrink;
        })
        .then((id) => {
          helpers.getCocktailsById(id)
            .then((details) => {
              var drink = JSON.parse(details).drinks[0];
              var cocktail = {
                drinkName: drink.strDrink,
                drinkImageUrl: 'https://' + drink.strDrinkThumb,
                drinkInstruction: drink.strInstructions,
                ingredient: helpers.filterIngredients(drink)
              }
              return cocktail;
            })
            .then((cocktail) => {
              //console.log('cocktail', cocktail)
              drinksToClient.push(cocktail);
              setTimeout(function() {
                res.end(JSON.stringify(drinksToClient));
              }, 1000)
              //console.log('OMGGGGG DRINKKKKKKKK TO CLIENTRTT', drinksToClient, 'LENGTH', drinksToClient.length)
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        })
    }
    if (req.body.alcohols[i] === 'beer') {
      //console.log("This ran");
      helpers.getBeer(req.body.alcohols[i], function(data) {
        for (var i = 0; i < data.length; i++) {
          var beerOrWine = {
            drinkName: data[i].name,
            drinkImageUrl: data[i].image_thumb_url
          }
          drinksToClient.push(beerOrWine);
        }
      })
    }
  }
})

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
