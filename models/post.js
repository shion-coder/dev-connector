const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */

const { Schema } = mongoose;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "uesrs",
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "uesrs",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "uesrs",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

/* -------------------------------------------------------------------------- */

module.exports = Post = mongoose.model("post", postSchema);
