const router = require("express").Router();
const userController = require("../controllers/userController");
const userValidation = require("../middlewares/userValidation")

router.get("/", userValidation, userController.getAllPosts);
router.get("/:username", userValidation, userController.getUserPosts)
router.post("/", userValidation, userController.addPost);
router.put("/post/:postId", userValidation, userController.updatePost);
router.delete("/post/:postId", userValidation, userController.deletePost);

module.exports = router;
