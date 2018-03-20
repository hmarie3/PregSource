var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var pg = require("pg");
const connectionStr = "postgres://ta_user:ta_pass@localhost:5432/familyhistory";

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getTri', function(req, res) {
   getTri(req, res);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', port);
});

function getTri(req, res) {
   // First get the person's id
   var id = req.query.id;

   // TODO: It would be nice to check here for a valid id before continuing on...

   // use a helper function to query the DB, and provide a callback for when it's done
   getTriFromDb(id, function(error, result) {
      // This is the callback function that will be called when the DB is done.
      // The job here is just to send it back.

      // Make sure we got a row with the person, then prepare JSON to send back
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      } else {
         var tri = result[0];
         res.status(200).json(result[0]);
      }
   });
}

function getTriFromDb(id, callback) {
   console.log("Getting trimester from DB with trimester: " + tri);

   var client = new pg.Client(connectionStr);

   client.connect(function(err) {
      if (err) {
         console.log("Error connecting to DB: ")
         console.log(err);
         callback(err, null);
      }

      var sql = "SELECT srctopic, srcurl FROM resources WHERE firsttri = yes";
      var params = [tri];

      var query = client.query(sql, params, function(err, result) {
         // we are now done getting the data from the DB, disconnect the client
         client.end(function(err) {
            if (err) throw err;
         });

         if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(err, null);
         }

         console.log("Found result: " + JSON.stringify(result.rows));

         // call whatever function the person that called us wanted, giving it
         // the results that we have been compiling
         callback(null, result.rows);
      });
   });

} // end of getPersonFromDb