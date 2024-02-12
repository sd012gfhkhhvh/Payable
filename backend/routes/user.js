const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController")

//user signup route
router.post("/signup", userController.userSignup)

//user signup route
router.post("/signin", userController.userSignin)

//update credentials
router.put("/signin", userController.userSignin)

module.exports = router