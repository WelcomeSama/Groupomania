const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// Creation du nouveau compte
exports.req_post_signup = async (data) =>
  bcrypt
    .hash(data.password, 10)
    .then((hash) => {
      // Check dans la BD si lemail exist
      // Si il existe alors tu revois un msg derreur
      // SI il nexiste pas alors tu le cree

      const user = new User({
        email: data.email,
        username: data.username,
        password: hash,
      });
      return user
        .save()
        .then(() => {
          return {
            status: 201,
            message: "Utilisateur créé.",
          };
        })
        .catch((error) => {
          return {
            status: 400,
            message: error,
          };
        });
    })
    .catch((error) => {
      return {
        status: 500,
        message: error,
      };
    });

exports.req_post_login = async (data) =>
  User.findOne({ email: data.email })
    .then((user) => {
      if (!user) {
        return {
          status: 401,
          message: "Utilisateur non trouvé !",
        };
      }
      return bcrypt
        .compare(data.password, user.password)
        .then((valid) => {
          if (!valid) {
            return {
              status: 401,
              message: "Mot de passe incorrect",
            };
          }
          return {
            status: 200,
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              token: jwt.sign({ userId: user._id }, "Token_Secret", {
                expiresIn: "24h",
              }),
            },
          };
        })
        .catch((error) => {
          return {
            status: 500,
            message: error,
          };
        });
    })
    .catch((error) => {
      return {
        status: 500,
        message: error,
      };
    });
