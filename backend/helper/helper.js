const User = require("../models/user");

exports.validEmail = async (email) => {
  return User.findOne({ email: email }).then((user) => user);
};
