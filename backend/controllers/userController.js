const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validEmail } = require("../helper/helper");
const jwt = require("jsonwebtoken");
var ObjectID = require("mongodb").ObjectID;
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

exports.ctr_post_signup = async (req, res, next) => {
  try {
    // Enregistre les info dans data
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      avatar: req.body.avatar,
    };
    // Appel la function post signup en y mettant le param data
    return await bcrypt
      .hash(data.password, 10)
      .then(async (hash) => {
        const checkEmail = await validEmail(data.email);

        if (checkEmail === null) {
          const user = new User({
            email: data.email,
            username: data.username,
            password: hash,
          });

          return user
            .save()
            .then(() => {
              res.status(201).json({
                status: 201,
                message: "Utilisateur créé.",
              });

              return {
                status: 201,
                message: "Utilisateur créé.",
              };
            })
            .catch((error) => {
              res.status(400).json({
                status: 400,
                message: error,
              });
            });
        } else {
          res.status(400).json({
            status: 400,
            message: 'L"utilisateur existe déjà.',
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: error,
        });
      });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.ctr_post_login = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    return await User.findOne({ email: data.email })
      .then(async (user) => {
        if (!user) {
          res.status(401).json({
            status: 401,
            message: "Utilisateur non trouvé !",
          });
        }
        return bcrypt
          .compare(data.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({
                status: 401,
                message: "Mot de passe incorrect",
              });
            }

            res.status(200).json({
              status: 200,
              user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                token: jwt.sign({ userId: user._id }, "Token_Secret", {
                  expiresIn: "72h",
                }),
              },
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: 500,
              message: error,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: error,
        });
      });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.ctr_get_all_user = async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

exports.ctr_get_user = (req, res, next) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

exports.ctr_delete_user = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.ctr_put_edit_user = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
