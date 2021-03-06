const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const emailValidator = function(email) {
  return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email);
};

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"]
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: [emailValidator, "not valid email format"]
    },
    password: {
      type: String,
      required: [true, "password is required"]
    },
    name: {
      type: String,
      required: [true, "password is required"]
    },
    status: String,
    posts: [{
      type: Schema.Types.ObjectId,
      ref: "posts"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
