var express = require('express');
var router = express.Router();

//Require the mongodb library to communicate with mongodb.
var mongodb = require('mongodb');

//This is to display all the existing documents in the db.
router.get('/', function(req, res, next) {
  //This entitiy will connect to the db.
  var MongoClient = mongodb.MongoClient;

  //The url of the footballsite db that you need to connect to.
  var url = 'mongodb://localhost:27017/footballsite';

  //Connect to the db.
  MongoClient.connect(url, function(err, db) {
    if(err) {
      //Some issue with the connection.
      console.log('Unable to connect to the server', err);
    } else {
      //Connection established.
      console.log('Connection established with \'' + db.databaseName + '\'.');

      //The listofplayers you put your info in.
      var listofplayers = db.collection('listofplayers');

      //Convert the listofplayers to an array in order to display it on a page.
      listofplayers.find({}).toArray(function(err, result) {
        if(err) {
          res.send(err);
        } else if(result.length) {
          console.log('The database \'' + db.databaseName + '\' has ' + result.length + ' documents.');
          
          //Send the result to some page.
          res.render('allPlayers', {
            title: 'All players',
            listofplayers : result
          });
        } else {
          res.send('No documents found.');
        }

        //Close the db connection before leaving.
        db.close();
      })
    }
  });
});

module.exports = router;
