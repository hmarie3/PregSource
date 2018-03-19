var express = require('express');
var app = express();
const { Client } = require('pg');
const url = require('url');

var scheme = "postgres";
var host = "localhost";
var user = "heather";
var pass = "33433233";
var port = "5433";
var db = "pregsource";

const client = new Client({
  host: host,
  user: user,
  database: db,
  password: pass,
  //port: port
});

client.connect();

app.get('/firsttri', function(req,res) {
   client.query('SELECT * FROM resources', function(err, result) {
      console.log(err, JSON.stringify(result));
  });
});

app.listen(5000, function() {
   console.log('Server started on port 5000...');
});

   //var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgresql://heather:33433233@database.server.com:3211/resources'

//app.set('view engine', 'ejs');

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