const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { user, post } = require("../models");

module.exports = {
  getAllPosts: function(req, res) {
    let params = {};
    if (req.query.search) {
      params = { postText: { $regex: `${req.query.search}`, $options: "i" } };
    }
    post
      .find(params)
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
    let params = {};
    if (req.query.like) {
      params.like = { $in: req.query.like };
    } else {
      params.username = req.params.username;
    }
    post
      .find(params)
      .then(posts => {
        res.status(200).json({
          msg: `get posts by ${req.params.username} posts`,
          posts
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
              msg: "successfully add new post to do list",
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
    let updatedPost = {};
    if (req.body.postText) {
      updatedPost.postText = req.body.postText;
    }
    post
      .findByIdAndUpdate(postId, { $set: updatedPost }, { new: true })
      .then(post => {
        let userLike = req.body.likedBy;
        let userUnlike = req.body.unlikedBy;
        if (userLike !== "") {
          if (post.like.indexOf(userLike) < 0) {
            post.like.push(userLike);
          }
        }
        if (userUnlike !== "") {
          post.like.pull(userUnlike);
          if (post.like[0] === undefined) {
            post.like.shift();
          }
        }
        post.save().then(post => {
          res.status(200).json({
            msg: "successfully update post",
            post
          });
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
          msg: "successfully remove post from list",
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
