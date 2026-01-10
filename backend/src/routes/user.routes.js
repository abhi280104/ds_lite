const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, userController.findByUserId);
router.get("/current", authMiddleware, userController.findCurrentUser);
router.get("/search", authMiddleware, userController.findByUserName);

module.exports = router;