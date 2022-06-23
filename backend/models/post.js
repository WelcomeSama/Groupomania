const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 500,
    },
    imageUrl: String,
    date: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          username: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
