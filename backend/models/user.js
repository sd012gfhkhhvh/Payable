const mongoose = require("../db/connection")

const schema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model("User", schema)

module.exports = User;