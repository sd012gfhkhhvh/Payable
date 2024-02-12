const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController")
const userAuthMiddleware = require("../middlewares/userAuthMiddleware")

//user signup route
router.post("/signup", userController.userSignup)

//user signup route
router.post("/signin", userController.userSignin)

//update credentials
router.put("/update", userAuthMiddleware, userController.updateInfo)

module.exports = router