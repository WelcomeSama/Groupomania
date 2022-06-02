const User = require("../models/user");
const bcrypt = require("bcrypt");


exports.signup = (req, res, next) => {
    const { email, username, password, isAdmin} = req.body;
    
  console.log(req.body);
  console.log(req.body.password);
  bcrypt.hash(password, 10)
  .then((hash) => {
      console.log(hash);
      User.create({
        email: email,
        username: username,
        password: hash,
        isAdmin: isAdmin
      })
      .then(() =>
          res.status(201).json({
            message: "Utilisateur créé.",
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
    
};



exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "Token_Secret", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
