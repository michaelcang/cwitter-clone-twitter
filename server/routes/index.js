const router = require("express").Router();
const loginController = require("../controllers/loginController");
const authentication = require("../middlewares/authentication")

router.get("/", function(req, res) {
  res.status(200).send("Cwitter Homepage");
});

router.post("/register", loginController.register);
router.post("/login", authentication, loginController.login);

module.exports = router;
