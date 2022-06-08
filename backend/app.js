const express = require("express");
const app = express();
const Sequelize = require("sequelize");

const path = require("path");
const cors = require('cors')
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user');
//const postRoutes = require('./routes/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let sequelize;

sequelize = new Sequelize('groupomania', 'openclassroom', 'openclassroom', {
  host: 'localhost',
  dialect: 'mysql'
});

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "openclassroom",
  password: "openclassroom",
  database: "groupomania",
  dialect: "mysql",
  port: "3306"
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

app.use(express.json());

app.use((req, res, next) => {
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
