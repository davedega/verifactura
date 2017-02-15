var db = require('./db/db.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers', 'skip, limit');
  next();
});

/**
 * The domain in which the server will be anwsering.
 * */
var SERVER_NAME = "localhost";

/**
 * The port in which the server will be anwsering.
 * */
var PORT = 4000;

var connection = {
  host: 'localhost',
  user: 'davedega',
  password: 'dav3d3ga',
  database: 'valparaiso'
};

db.sayhello();


app.listen(PORT, SERVER_NAME, function () {
  console.log("Listening on port " + PORT);
  require('./routes/routes.js')(app);
});

// db.connect(getDbConf(), function (err) {
//     (err) ? error(err) : success(app);
// })

// connection.connect(function (err) {
//     (err) ? error(err) : success(app);
// });


function error(err) {
  console.log('Unable to connect to Mysql. ' + err);
  process.exit(1);
}

function success(app) {
  console.log('Connected to "' + connection.database + '"');
  app.listen(PORT, SERVER_NAME, function () {
    console.log("Listening on port " + PORT);
    require('./routes/routes.js')(app);
  });
  // Logger.setLevel(LOG_LEVEL);
}

function getDbConf() {
  return {
    connectionLimit: 10,
    host: 'localhost',
    user: 'davedega',
    password: 'dav3d3ga',
    database: 'valparaiso'
  }
}
