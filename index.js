var express = require('express');
var app = express();
const { Client } = require('pg');
const url = require('url');
var bodyParser = require('body-parser');

var scheme = "postgres";
var host = "localhost";
var user = "heather";
var pass = "password";
var port = "5433";
var db = "pregsource";

var db_url = url.parse(process.env.DATABASE_URL);

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

//var selected;

app.set('view engine', 'ejs');

app.get('/firsttri', function(req,res) {
   var JSONresult;
   client.query("SELECT * FROM resources WHERE firsttri = 'yes'", function(err, result) {
      JSONresult = JSON.stringify(result);
      console.log(err, JSONresult);
      //var selected = req.body.selected;
      //console.log('User selected: ' + selected);
   });
   res.render("firsttri", {
      //selected : selected,
      JSONresult : JSONresult
   });
});

app.listen(5000, function() {
   console.log('Server started on port 5000...');
});

   //var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgresql://heather:33433233@database.server.com:3211/resources'


// app.get('/', function(req, res, next) {
//    res.render('views/home');
// });

   // pg.connect(connectionString, function(err, resource, done) {
   //    if(err) {
   //       return console.error('error fetching resource', err)
   //    }
   //    console.log('connected to database');
   //    resource.query('SELECT srcurl FROM resources WHERE firsttri = yes', function(err, result) {
   //       if(err) {
   //          return console.error('error running query', err);
   //       }
   //       res.send(result);
   //    });
   // });

// app.listen(port, function(req, res) {
//    console.log('pregsource app is listening on port ' + port);
// });


// var resources = new Src({
//    connectionString: connectionString,
// });
// resources.connect();

// resources.query('SELECT srcurl FROM resources WHERE firsttri = yes', (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message)
//   resources.end()
// });