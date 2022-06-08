const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.req_post_signup = async (data) =>
  User.create({
    email: data.email,
    username: data.username,
    password: data.password,
    isAdmin: data.isAdmin,
  })
    .then(
      (resultat) => console.log("resultat: ", resultat)
      // res.status(201).json({
      //   message: "Utilisateur créé.",
      // })
    )
    .catch(
      (error) => console.log("ERROR", error)
      // res.status(400).json({
      //   error,
      // })
    );

// .then((hash) =>

//   bcrypt
//     .hash(data.password, 10)

//     )
