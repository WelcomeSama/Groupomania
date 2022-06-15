const {
  req_post_signup,
  req_post_login,
} = require("../repository/userRepository");

exports.ctr_post_signup = async (req, res, next) => {
  try {
    // Enregistre les info dans data
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    // Appel la function post signup en y mettant le param data
    const req_signup = await req_post_signup(data);

    // Check s'il ya une erreur
    if (req_signup.status !== 201) {
      res.status(req_signup.status).json(req_signup);
    }

    // si tout est OK
    res.status(req_signup.status).json(req_signup);
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

    const req_login = await req_post_login(data);

    // Check s'il ya une erreur
    if (req_login.status !== 200) {
      res.status(req_login.status).json(req_login);
    }

    // si tout est OK
    res.status(req_login.status).json(req_login);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.ctr_get_user = (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.ctr_delete_user = (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.ctr_put_edit_user = (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next();
  }
};
