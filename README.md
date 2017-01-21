# NodeJS Express MongoDB
This is a simple walkthrough of how one can use Node JS with Express and MongoDB.

## Installation
###Express Generator
```
npm install -g express-generator
```

Go the directory where you want your site to be. We shall use the embedded js template.
This will create an express project.
```
express <project name> --view=ejs -c less
```

Go to package.json, in the dependencies section, add the following.
```json
"kerberos": "~0.0.17",
"mongodb": "~2.2.16"
```

On node js cmd, 
```
cd <project name>
npm install
```
The node_modules folder is not included in the repository. The folder gets created automatically after running the above commands.

If it says that the versions that you're using are too old, follow the prompt and put in the latest versions.
```
npm install -g npm@latest
```

##Quick Start

In the ```<project name>``` folder on node js cmd, 
```
md data
```

This will make a directory name data. This will be used by mongo db.
```
npm start
```
The above will start the execution. Go to a web browser and check localhost:3000. It should be working fine.

Open new node js cmd and type the below. Replace the path with the path of the data directory you made earlier. This will start the mongo db server. It will say waiting for connection.
```
mongod --dbpath "<project path>\data"
```
In a new node js cmd, type,
```
mongo
```
The above will establish a connection with the server. In the same cmd,
```
use footballsite
```
footballsite is the database that we shall use.

We shall insert 1 document in the database. This will be used later to check if the info got inserted correctly in the db (via node). We will use the listofplayers collection within the footballsite db.
```
db.listofplayers.insert([{"name" : "Alice Wood", "goals" : 25}])
```



##Fetch all documents from MongoDB
```javascript
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
```



##Add a document in MongoDB
```javascript
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
```



##Update a document in MongoDB
```javascript
/*
* This will update a document in the db.
*/
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

      //Convert the listofplayers to an array.
      listofplayers.find({}).toArray(function(err, result) {
        if(err) {
          res.send(err);
        } else if(result.length) {
          console.log('The database \'' + db.databaseName + '\' has ' + result.length + ' documents.');

          //This will update the document in the db.
          listofplayers.updateOne({"name" : "Alice Wood"}, { $set: { goals : 125 } }, function(err, result) {
              if(err) {
                  console.log(err);
              } else {
                  console.log('Document updated successfully.');
                  res.redirect('../allplayers');
              }
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
```



##Delete a document from MongoDB
```javascript
/*
* This will delete a document in the db.
*/
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

      //Convert the listofplayers to an array.
      listofplayers.find({}).toArray(function(err, result) {
        if(err) {
          res.send(err);
        } else if(result.length) {
          console.log('The database \'' + db.databaseName + '\' has ' + result.length + ' documents.');

          //This will update the document in the db.
          listofplayers.deleteOne({"name" : "Freddie Lide"}, function(err, result) {
              if(err) {
                  console.log(err);
              } else {
                  console.log('Document deleted successfully.');
                  res.redirect('../allplayers');
              }
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
```



##Find a single document in MongoDB
After getting the list of documents (in this case listofplayers) from MongoDB,
```javascript
listofplayers.findOne({"name" : "Alice Wood"}, function(err, result) {
          if(err) {
              console.log(err);
          } else {
              console.log('Record found.');
              console.log(result.name);
          }
      });
```



##Other comments
Please check the following,
* routes/allPlayers.js
  * Backend handler to list all the players that currently exist in the db.
* views/allPlayers.ejs
  * Front end page that displays all the documents in the db.
* routes/addPlayer.js
  * Backend handler to add a new player in the db.
* views/addPlayer.ejs
  * Front end page that displays a form to add a new player in the db.
