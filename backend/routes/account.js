const { Router } = require("express");
const router = Router();
const userAuthMiddleware = require("../middlewares/userAuthMiddleware")
const accountController = require("../controllers/accountController")

// get user balance
router.get("/balance", userAuthMiddleware, accountController.getbalance)

// transactions
router.post("/transfer", userAuthMiddleware, accountController.transferMoney)

module.exports = router