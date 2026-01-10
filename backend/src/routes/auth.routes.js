const router = require("express").Router();
const userController = require("../controllers/auth.controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;

