const { Types } = require("mongoose")
const mongoose = require("../db/connection")

const accountSchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema)

module.exports = Account