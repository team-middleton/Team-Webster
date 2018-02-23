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

let random = function(arr) {
  var randomIndex = Math.floor((Math.random() * arr.length) + 0);
  return randomIndex;
};

let auth = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(404);
  }
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
    if (req.body.alcohols[i] === 'beer') {
      helpers.getBeer(req.body.alcohols[i], function(data) {
        for (var i = 0; i < data.length; i++) {
          var beerOrWine = {
            drinkName: data[i].name,
            drinkImageUrl: data[i].image_thumb_url,
            ingredient: ['N/A']
          }
          drinksToClient.push(beerOrWine);
        }
      })
    }
  }
})

app.post('/playlist', function(req, res) {
  helpers.getMusic(req.body.category, function(results) {
    var randomPlaylistIndex = random(results.playlists.items);
    res.send(results.playlists.items[randomPlaylistIndex]);
  })
})

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
          console.log(results);
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

app.post('/logout', function(req, res) {
  req.session.destroy();
  res.sendStatus(201);
})

app.post('/favorites', auth, function(req, res) {
  const sqlQuery = `INSERT INTO favorites (drinks, music, user_id) VALUES (?, ?, (SELECT id FROM users WHERE username = '${req.session.user}'))`;
  const stringDrinks = JSON.stringify(req.body.drinks);
  const placeholderValues = [stringDrinks, req.body.playlist];
  console.log(req.body.drinks, req.body.playlist)
  db.query(sqlQuery, placeholderValues, function(error) {
    if (error) {
      throw error;
    } else {
      res.sendStatus(201);
    }
  });
})

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
