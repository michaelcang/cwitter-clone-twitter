const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { user, post } = require("../models");

module.exports = {
  getAllPosts: function(req, res) {
    post
      .find()
      .then(posts => {
        res.status(200).json({
          msg: "get all posts",
          posts
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  },
  getUserPosts: function(req, res) {
    let params = { username: req.params.username };
    if (req.query.like) {
      params.like = { $in: req.query.like };
    }
    user
      .find(params)
      .populate("posts")
      .then(user => {
        res.status(200).json({
          msg: `get ${req.params.username} posts`,
          posts: user[0].posts
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  },
  addPost: function(req, res) {
    let username = req.body.username;
    let postText = req.body.postText;
    post
      .create({ username, postText })
      .then(post => {
        user
          .findOneAndUpdate(
            { username },
            { $push: { posts: post._id } },
            { new: true }
          )
          .then(affectedUser => {
            res.status(201).json({
              msg: "successfully add new action to do list",
              affectedUser,
              post
            });
          });
      })
      .catch(err => {
        if (err) {
          res.send(err.errors);
        }
      });
  },
  updatePost: function(req, res) {
    let postId = req.params.postId;
    let updatedPost = req.body;
    post
      .findByIdAndUpdate(postId, { $set: updatedPost }, { new: true })
      .then(post => {
        res.status(200).json({
          msg: "successfully update post",
          post
        });
      })
      .catch(err => {
        if (err) {
          res.send(err);
        }
      });
  },
  deletePost: function(req, res) {
    let postId = req.params.postId;
    post
      .findByIdAndRemove(postId)
      .then(post => {
        res.status(200).json({
          msg: "successfully remove to do from list",
          post
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  }
};
