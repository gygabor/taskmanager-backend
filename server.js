// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('.data/data.db');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());

// // http://expressjs.com/en/starter/basic-routing.html
app.get("/table", function (request, response) {
  db.run("SELECT * user", function(err, rows, fields) {
  	response.send(rows);
	});
});

app.post("/user", function (request, response) {
  db.run('INSERT INTO user SET ?', [{username: request.body.name, password: request.body.password, token: request.body.token}], function(err, rows, fields) {
  	response.send(rows);
	});
});

// app.get("/dreams", function (request, response) {
//   response.send(dreams);
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// // Simple in-memory store for now
// var dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
