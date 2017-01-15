# NodeJSWithExpressAndMongoDB
This is a simple walkthrough of how one can use node js with express and mongo db.

## Installation
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

If it says that the versions that you're using are too old, follow the prompt and put in the latest versions.
```
npm install -g npm@latest
```

##Prerequisites

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

We shall insert 1 document in the database. This will be used later to check if the info got inserted correctly in the db (via node). We will use the students collection within the sampsite db.
```
db.listofplayers.insert([{"name" : "Alice Wood", "goals" : 25}])
```
