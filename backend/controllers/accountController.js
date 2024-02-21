const { default: mongoose } = require("mongoose");
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

    const fromUserId = req.userId; //getting userId from userAuth middleware
    const toAccountId = req.body.to
    const amount = req.body.amount

    //start a session to initiate the transaction
    const session = await mongoose.startSession();

    //initiation of the transaction
    session.startTransaction();

    try {

        // Fetch the accounts within the transaction
        const account = await Account.findOne({
            userId: fromUserId
        }).session(session)

        if (account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const toAccount = await Account.findOne({
            userId: toAccountId
        }).session(session)

        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        // Perform the transfer
        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        })

        await Account.updateOne(
            {
                userId: to
            },
            {
                $inc: {
                    balance: amount
                }
            },
            // Rollback logic without using mongodb transaction
            // (err, docs) => {
            //     if (err) {
            //         // money roll back logic
            //         Account.updateOne({
            //             userId: userId
            //         }, {
            //             $inc: {
            //                 balance: amount
            //             }
            //         }).then(() => {
            //             console.log("Money rolled back successfully")
            //             return res.status(404).json({ message: "Error in creditting money to the recipants account." })
            //         })

            //     } else {
            //         console.log("Updated Docs : ", docs);
            //         return res.status(200).json({
            //             message: "Transfer successful"
            //         })
            //     }
            // }
        ).session(session)

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });

    } catch (err) {
        // rollback the transaction
        await session.abortTransaction();
        console.log(err.message);
        res.status(404).json({ message: "error transfering money" });
    }
}

module.exports = {
    getbalance,
    transferMoney,
}