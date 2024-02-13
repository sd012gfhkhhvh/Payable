const mongoose = require("../db/connection")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model("User", userSchema)

module.exports = User;