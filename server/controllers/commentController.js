const mongoose = require("mongoose");
const { user, post, comment } = require("../models");

module.exports = {
  addComment: function(req, res) {
    let postId = req.params.postId;
    let username = req.body.username;
    let body = req.body.body;
    comment
      .create({ username, body })
      .then(comment => {
        post
          .findById(postId)
          .then(post => {
            let commentId = comment._id;
            post.comments.push(commentId);
            post.save().then(post => {
              res.status(200).json({
                msg: "successfully add comment and update post",
                post
              });
            });
          })
      })
      .catch(err => {
        if (err) {
          res.send(err.errors);
        }
      });
  }
};
