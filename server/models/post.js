const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    username: {
      type: String
    },
    postText: {
      type: String,
      required: [true, "post cannot be blank"]
    },
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts"
      }
    ],
    retweet: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts"
      }
    ],
    like: [
      {
        type: String,
        ref: "users"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);
