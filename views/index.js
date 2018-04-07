/**********************************************************************************************
* AUTHOR: Heather Brune
* CLASS: CS 313: 02
* PROJECT TITLE: PregSource
* FILE NAME: index.js
**********************************************************************************************/
 
var express = require('express');
var app = express();
const { Client } = require('pg');
const url = require('url');
var bodyParser = require('body-parser');
var db_url = url.parse(process.env.DATABASE_URL);

//parsing out the heroku info provided by Ralph Borcherds
var scheme = db_url.protocol.substr(0, db_url.protocol.length - 1);
var user = db_url.auth.substr(0, db_url.auth.indexOf(':'));
var pass = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length);
var host = db_url.host.substr(0, db_url.host.indexOf(':'));
var port = db_url.host.substr(db_url.host.indexOf(':') + 1, db_url.host.length);
var db = db_url.path.substr(db_url.path.indexOf('/') + 1, db_url.path.length);

const client = new Client({
  host: host,
  user: user,
  database: db,
  password: pass,
  port: port
});

client.connect();

app.get('/', function(req, res) {
   res.render('home');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//database queries follow
app.get('/firsttri', function(req,res) {
   client.query("SELECT * FROM resources WHERE firsttri = 'yes'", function(err, result) {
      if(err) {
        console.log('Unknown Error');
        return;
      }
      res.render("firsttri", {
         EJSresult: result
      });
   });
});

app.get('/secondtri', function(req,res) {
   client.query("SELECT * FROM resources WHERE secondtri = 'yes'", function(err, result) {
      if(err) {
        console.log('Unknown Error');
        return;
      }
      res.render("secondtri", {
         EJSresult: result
      });
   });
});

app.get('/thirdtri', function(req,res) {
   client.query("SELECT * FROM resources WHERE thirdtri = 'yes'", function(err, result) {
      if(err) {
        console.log('Unknown Error');
        return;
      }
      res.render("thirdtri", {
         EJSresult: result
      });
   });
});

app.get('/postpartum', function(req,res) {
   client.query("SELECT * FROM resources WHERE postpartum = 'yes'", function(err, result) {
      if(err) {
        console.log('Unknown Error');
        return;
      }
      res.render("postpartum", {
        EJSresult: result
      });
   });
});

app.listen(process.env.PORT || 5000, function() {
   console.log('Server started on port...');
});

module.exports = app;