const jwt = require("jsonwebtoken");
const { req_post_signup } = require("../repository/userRepository");

exports.signup = async (req, res, next) => {
  try {
    const data = { 
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin:  req.body.isAdmin
    }
    console.log(data)
    await req_post_signup(data)
    res.sendStatus(201);

    // console.log(req.body);
    // console.log(req.body.password);
    // await bcrypt
    //   .hash(password, 10)
    //   .then((hash) => {
    //     User.create({
    //       email: email,
    //       username: username,
    //       password: hash,
    //       isAdmin: isAdmin,
    //     })
    //       .then(
    //         (resultat) => console.log("resultat: ", resultat)
    //         // res.status(201).json({
    //         //   message: "Utilisateur créé.",
    //         // })
    //       )
    //       .catch(
    //         (error) => console.log("ERROR", error)
    //         // res.status(400).json({
    //         //   error,
    //         // })
    //       );
    //   })
    //   .catch((error) =>
    //   console.log(error)
    //     // res.status(500).json({
    //     //   error,
    //     // })
    //   );

  } catch (err) {
    console.log(err);
    next();
  }
};

exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé !",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
              },
              "Token_Secret",
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

exports.getMyId = (req, res, next) => {};

exports.getOneUser = (req, res, next) => {};

exports.modifyUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};

exports.getAllCountByUser = (req, res, next) => {};
