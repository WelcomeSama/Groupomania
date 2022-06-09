const bcrypt = require("bcrypt");
const db = require("../models");

// Creation du nouveau compte
exports.req_post_signup = async (data) =>
  bcrypt
  .hash(data.password, 10).then((hash) =>
    // instance sur db.User (model)
    db.User.create({
      email: data.email,
      username: data.username,
      password: hash,
      isAdmin: data.isAdmin,
    })
    .then(
      () => {
        return {
          status: 201,
          message: "Utilisateur créé."
        }
      }
    )
    .catch(
      (error) => {
        return {
          status: 500,
          message: error
        }
      }
    )
  )
