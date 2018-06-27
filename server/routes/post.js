const router = require("express").Router();
const postController = require("../controllers/postController");
const userValidation = require("../middlewares/userValidation")

router.get("/", userValidation, postController.getAllPosts);
router.get("/:username", userValidation, postController.getUserPosts)
router.post("/", userValidation, postController.addPost);
router.put("/:postId", userValidation, postController.updatePost);
router.delete("/:postId", userValidation, postController.deletePost);

module.exports = router;
