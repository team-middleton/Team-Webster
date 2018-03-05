var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../database/database.js');
var bcrypt = require('bcrypt');
var helpers = require('./helpers.js').helpers;
var session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(session({
  secret: 'webster',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 3600000}
}))

//This is our randomize function which takes in an array of items and outputs a random index.
//This is used frequently throughout our code.
let random = function(arr) {
  var randomIndex = Math.floor((Math.random() * arr.length) + 0);
  return randomIndex;
};

//Authentication middleware.
let auth = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(404);
  }
};

//MAKING REQUESTS TO Multiple APIs, split into two parts.
//APIs - CocktailDB for coctails and LSCO for beer and wine

//This first part calls the helper function getCocktails to obtain cocktail data from the API.
app.post('/drinks', function (req, res) {
  var drinksToClient = [];
  for (var i = 0; i < req.body.alcohols.length; i++) {
    if (req.body.alcohols[i] !== 'beer' || req.body.alcohols[i] !== 'white+wine' || req.body.alcohols[i] !== 'red+wine') {
      helpers.getCocktails(req.body.alcohols[i])
        .then((data) => {
          return JSON.parse(data);
        })
        .then((cocktailInfo) => {
          //Randomizes the cocktail IDs we get from the data obtained, which is used in the below promise.
          var randomIndex = Math.floor((Math.random() * cocktailInfo.drinks.length));
          return cocktailInfo.drinks[randomIndex].idDrink;
        })
        //This makes a seperate call to the API again, using a seperate helper function looking up cocktails by ID
        //This allows us to obtain the instructions and ingredients
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
              drinksToClient.push(cocktail);
              setTimeout(function() {
                res.end(JSON.stringify(drinksToClient));
              }, 1000)
            })
            .catch((error) => {
              throw error;
            })
        })
        .catch((error) => {
          throw error;
        })
    }

    //This second part uses a helper getBeer to obtain data from LSCO.
    //Missing Wines for some reason...possibly add req.body.alcohols[i] === 'beer'|| req.body.alcohols[i] === 'red+wine'
    if (req.body.alcohols[i] === 'beer') {
      helpers.getBeer(req.body.alcohols[i], function(data) {
        for (var i = 0; i < data.length; i++) {
          var beerOrWine = {
            drinkName: data[i].name,
            drinkImageUrl: data[i].image_thumb_url,
            //We add N/A here because there are no ingredient lists for the Beer and Wine.
            ingredient: ['N/A']
          }
          drinksToClient.push(beerOrWine);
        }
      })
    }
  }
})

//This uses the helper function getMusic to obtain playlists depending on the category selected on the client side.
app.post('/playlist', function(req, res) {
  helpers.getMusic(req.body.category, function(results) {
    //Randomizes the playlists we get from our helper function.
    var randomPlaylistIndex = random(results.playlists.items);
    res.send(results.playlists.items[randomPlaylistIndex]);
  })
})

//Basic signup route which uses bcrypt to salt and hash and eventually gets inserted into the database.
app.post('/signup', function(req, res) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
    const sqlQuery = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
    const placeholderValues = [req.body.username, hash, req.body.email];
    db.query(sqlQuery, placeholderValues, function(error) {
      if (error) {
        throw error;
      } else {
        res.sendStatus(201);
      }
    })
  })
})

//Same as above. Login route and using bcrypt to compare passwords in the database.
app.post('/login', function(req, res) {
  const sqlQuery = `SELECT username, password FROM users WHERE username = "${req.body.username}"`;
  db.query(sqlQuery, function(error, results) {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      console.log("Failed to login")
    } else {
      bcrypt.compare(req.body.password, results[0].password, function(error, results) {
        if (results) {
          req.session.regenerate(() => {
            req.session.user = req.body.username;
            res.sendStatus(201);
          });
        } else {
          res.sendStatus(404);
        }
      })
    }
  })
})

//Logout route to destroy the current session when user logs out.
app.post('/logout', function(req, res) {
  req.session.destroy();
  res.sendStatus(201);
})

// Favorites list POST, takes in the current user session and saves the playlist ID and the drinks in the database.
app.post('/favorites', auth, function(req, res) {
  const sqlQuery = `INSERT INTO favorites (drinks, music, user_id) VALUES (?, ?, (SELECT id FROM users WHERE username = '${req.session.user}'))`;
  const stringDrinks = JSON.stringify(req.body.drinks);
  const placeholderValues = [stringDrinks, req.body.playlist];
  db.query(sqlQuery, placeholderValues, function(error) {
    if (error) {
      throw error;
    } else {
      res.sendStatus(201);
    }
  });
})

//Deletes the currently selected favorite.
app.post('/delete', auth, function(req, res) {
  const sqlQuery = `DELETE FROM favorites WHERE id = ${req.body.favId}`
  db.query(sqlQuery, function(error) {
    if (error) {
      throw error;
    } else {
      res.sendStatus(201);
    }
  })
})

//This GETS all the favorites from the current user logged in.
app.get('/favorites', auth, function(req, res) {
  const sqlQuery = `SELECT favorites.id, drinks, music FROM favorites JOIN users ON favorites.user_id = users.id AND users.username = '${req.session.user}'`;
  db.query(sqlQuery, function(error, results) {
    if (error) {
      throw error;
    } else {
      console.log("These are my results in server", results)
      res.status(200).send(results);
    }
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000!');
});
