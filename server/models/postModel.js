const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Daily",
        "Education",
        "Literature",
        "Entertainment",
        "Art",
        "Uncategorized",
      ],
      message: "{VALUE is not supported}",
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
