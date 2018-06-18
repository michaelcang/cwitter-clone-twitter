const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = {
  register: function(req, res) {
    let hash = "";
    let username = req.body.username;
    if (req.body.password !== "") {
      let salt = bcrypt.genSaltSync(7);
      hash = bcrypt.hashSync(req.body.password, salt);
    }
    let userInfo = {
      username,
      email: req.body.email,
      password: hash,
      name: req.body.name
    };
    user.findOne({ username }).then(found => {
      if (found) {
        res.send({ err: { message: "username is used" } });
      } else {
        user
          .create(userInfo)
          .then(newUser => {
            let username = newUser.username;
            let name = newUser.name;
            let token = jwt.sign({ username }, process.env.SECRET_KEY);
            res.status(201).json({
              msg: "successfully create new user",
              token,
              name
            });
          })
          .catch(err => {
            res.send(err.errors);
          });
      }
    });
  },
  login: function(req, res) {
    let username = req.body.username;
    let userId = req.body.userId;
    let name = req.body.name;
    let token = jwt.sign({ username, userId }, process.env.SECRET_KEY);
    res.status(200).json({
      message: "successfully sign in",
      token,
      name
    });
  }
};
