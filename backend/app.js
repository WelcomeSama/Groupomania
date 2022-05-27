const express = require("express");
const app = express();

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

module.exports = app;
