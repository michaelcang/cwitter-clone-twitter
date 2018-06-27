const router = require("express").Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const userValidation = require("../middlewares/userValidation")

router.get("/", userValidation, postController.getAllPosts);
router.get("/:username", userValidation, postController.getUserPosts);
router.post("/", userValidation, postController.addPost);
router.put("/:postId", userValidation, postController.updatePost);
router.delete("/:postId", userValidation, postController.deletePost);

router.post("/:postId/comment", userValidation, commentController.addComment)


module.exports = router;
