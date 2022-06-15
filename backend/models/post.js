const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  //likes: Number,
  //usersLiked: [String],
});

module.exports = mongoose.model("Post", postSchema);
