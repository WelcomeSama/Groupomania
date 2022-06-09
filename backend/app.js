const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const {
  initConnDB
} = require("./config/connection");

initConnDB();

//const postRoutes = require('./routes/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
//app.use("/api/post", postRoutes);

app.use(cors());


module.exports = app;
