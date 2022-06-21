const express = require("express");
const app = express();

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://usertest:openclassroom@cluster0.bogvs.mongodb.net/groupomania?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log(`${err},Connexion à MongoDB échouée !`));

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
app.use("/api/post", postRoutes);

module.exports = app;
