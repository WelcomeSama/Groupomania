const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
const { boolean } = require("observable");

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  admin: { type: boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
