const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const helpers = require('./helpers.js').helpers;


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