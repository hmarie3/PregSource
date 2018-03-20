var express = require('express');
var app = express();
const { Client } = require('pg');
const { URL } = require('url');
var bodyParser = require('body-parser');
console.log(process.env.DATABASE_URL);
var db_url = process.env.DATABASE_URL;
//postgres://heather:33433233@localhost/pregsource
if(typeof db_url !== 'undefined' && db_url !== null) {
   var scheme = db_url.protocol.substr(0, db_url.protocol.length - 1);
   var user = db_url.auth.substr(0, db_url.auth.indexOf(':'));
   var pass = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length);
   var host = db_url.host.substr(0, db_url.host.indexOf(':'));
   var port = db_url.host.substr(db_url.host.indexOf(':') + 1, db_url.host.length);
   var db = db_url.path.substr(db_url.path.indexOf('/') + 1, db_url.path.length);
} else {
   var scheme = "postgres";
   var host = "localhost";
   var user = "heather";
   var pass = "33433233";
   var port = "5432";
   var db = "pregsource";
   
}
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
   var MYresult;
   client.query("SELECT * FROM resources WHERE firsttri = 'yes'", function(err, result) {
      var JSONresult = JSON.stringify(result);
      MYresult = JSON.parse(JSONresult);
      console.log(err, MYresult);
      //var selected = req.body.selected;
      //console.log('User selected: ' + selected);
   });
   res.render("firsttri", {
      //selected : selected,
      MYresult: result
   });
});

app.listen(5000, function() {
   console.log('Server started on port 5000...');
});

module.exports = app;

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