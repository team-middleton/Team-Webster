var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var db = require('../database/database.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

//POST ROUTE

app.post('/drinks', function(req, res) {
  helpers.getBeer(function(data){
    console.log(data);
  });
  res.end();
})

app.post('/signup', function(req, res) {
  var sqlQuery = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
  var placeholderValues = [req.body.username, req.body.password, req.body.email];
  db.query(sqlQuery, placeholderValues, function(error) {
    if (error) {
      throw error;
    } else {
      res.sendStatus(201);
    }
  })
})

app.post('/login', function(req, res) {
  var sqlQuery = `SELECT username FROM users WHERE username = "${req.body.username}" AND password = "${req.body.password}"`;
  db.query(sqlQuery, function(error, results) {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      console.log("Failed to login")
    } else {
      res.sendStatus(201);
    }
  })
})


//GET ROUTE
app.get('/drinks', function(req, res) {


})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
