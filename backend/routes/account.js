const { Router } = require("express");
const router = Router();
const userAuthMiddleware = require("../middlewares/userAuthMiddleware")

//import controller
const accountController = require("../controllers/accountController")

//get user balance
router.get("/balance", userAuthMiddleware, accountController.getbalance)

module.exports = router