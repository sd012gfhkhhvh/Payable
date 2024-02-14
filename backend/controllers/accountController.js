const Account = require("../models/account");

const getbalance = async (req, res, next) => {
    const userId = req.userId; //getting userId from userAuth middleware

    try {
        // Get the account information 
        const { balance } = await Account.findOne({ userId })

        res.status(200).json({ balance: balance });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "error getting balance" });
    }
}

const transferMoney = async (req, res, next) => {
    const userId = req.userId; //getting userId from userAuth middleware

    const toAccountId = req.body.to
    const amount = req.body.amount

    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        if (account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const toAccount = await Account.findOne({
            userId: toAccountId
        });

        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        })

        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        })

        res.json({
            message: "Transfer successful"
        })
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "error transfering money" });
    }
}

module.exports = {
    getbalance,
    transferMoney,
}