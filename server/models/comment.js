const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    username: {
      type: String
    },
    body: {
      type: String,
      required: [true, "comment cannot be blank"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);