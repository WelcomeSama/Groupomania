const jwt = require("jsonwebtoken");
const { req_post_signup } = require("../repository/userRepository");

exports.signup = async (req, res, next) => {
  try {
    // Enregistre les info dans data
    const data = { 
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin:  req.body.isAdmin
    }
    // Appel la function post signup en y mettant le param data
    const req_signup = await req_post_signup(data)

    // Check s'il ya une erreur
    if(req_signup.status === 500)
    {
      res.status(500).json(req_signup)      
    }

    // si tout est OK 
    res.status(201).json(req_signup)      
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
