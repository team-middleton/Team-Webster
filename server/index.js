var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../database/database.js');
var bcrypt = require('bcrypt');
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

app.post('/signup', function(req, res) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
    var sqlQuery = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
    var placeholderValues = [req.body.username, hash, req.body.email];
    db.query(sqlQuery, placeholderValues, function(error) {
      if (error) {
        throw error;
      } else {
        res.sendStatus(201);
      }
    })
  })
})

app.post('/login', function(req, res) {
  var sqlQuery = `SELECT username, password FROM users WHERE username = "${req.body.username}"`;
  db.query(sqlQuery, function(error, results) {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      console.log("Failed to login")
    } else {
      bcrypt.compare(req.body.password, results[0].password, function(error, results) {
        if (results) {
          res.sendStatus(201);
        } else {
          res.sendStatus(404);
        }
      })
    }
  })
})

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
