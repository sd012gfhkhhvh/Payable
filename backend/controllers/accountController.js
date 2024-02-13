const Account = require("../models/account");

const getbalance = async (req, res, next) => {
    const userId = req.userId; //getting userId from userAuth middleware

    try {
        // Get the account information 
        const { balance } = await Account.findOne({userId})

        res.status(200).json({balance: balance});
    }catch(err) {
        console.log(err.message);
        res.status(404).json({message: "error getting balance"});
    }
}

module.exports = {
    getbalance,
}