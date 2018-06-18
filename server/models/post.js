const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    username: {
      type: String
    },
    post: {
      type: String,
      required: [true, "post cannot be blank"]
    },
    reply: [{
      type: Schema.Types.ObjectId,
      ref: "posts"
    }],
    likeCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);