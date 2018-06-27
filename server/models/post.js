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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments"
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
