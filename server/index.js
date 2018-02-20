var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
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


//GET ROUTE
app.get('/drinks', function(req, res) {
  

})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
