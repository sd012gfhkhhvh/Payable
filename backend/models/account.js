const { Types } = require("mongoose")
const mongoose = require("../db/connection")

const schema = new mongoose.Schema({
    userId: Types.ObjectId,
	balance: Number || Float64Array
})

const Account = mongoose.model("Account", schema)

module.exports = Account