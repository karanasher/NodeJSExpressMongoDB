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
