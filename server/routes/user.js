const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllPosts);
router.get("/:username", userController.getUserPosts)
router.post("/", userController.addPost);
router.put("/:postId", userController.updatePost);
router.delete("/:postId", userController.deletePost);

module.exports = router;
