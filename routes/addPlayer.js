var express = require('express');
var router = express.Router();

//Require the mongodb library to communicate with mongodb.
var mongodb = require('mongodb');

/*
* This is to just display a page with a form to add a new player.
* This will not perform any db operation.
*/
router.get('/', function(req, res, next) {
  res.render('addPlayer', {
      title: 'Add player'
  });
});

/*
* The onclick handler of the Add player to db button on the add player page.
* This will add the player in to the db.
*/
router.post('/addplayertodb', function(req, res) {
  //This will communicate woth the db.
  var MongoClient = mongodb.MongoClient;

  //The url of the db.
  var url = 'mongodb://localhost:27017/footballsite';

  //Establish a connection with the db.
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Unable to connect to server.', err);
    } else {
      //Connection established.
      console.log('Connection established with \'' + db.databaseName + '\'.');

      //Chooose the collection to insert the info into.
      var listofplayers = db.collection('listofplayers');

      //Pick the new player from the form.
      var newPlayerFromForm = {
        name: req.body.name,
        goals: req.body.goals
      };

      //Insert the new student into the db.
      listofplayers.insert([newPlayerFromForm], function(err, result) {
        if(err) {
          console.log(err);
        } else { 
          console.log('Redirecting to show all the documents in the db.');

          /*
          * On successful insertion, redirect to the page which shows all the documents in the db.
          * .. since it has to move up 1 level (localhost:3000/allplayers).
          */
          res.redirect('../allplayers');
        }

        //Always close the db connection before leaving.
        db.close();
      });
    }
  });
});

module.exports = router;
