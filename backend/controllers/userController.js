const zod = require('zod')
const jwt = require('jsonwebtoken')
const userSchema = require('../schemas/user')
const User = require("../models/userModel")

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET;

const userSignup = async (req, res, next) => {
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }

    try {
        // Input validation via zod
        const validatedInput = userSchema.safeParse(user)

        // db validation for same username
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            res.status(411).json({
                message: "Email already taken"
            })
        }

        if (!validatedInput.success) {
            res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        // create new user
        const newUser = await User.create(user)

        //sign a new jwt token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)

        res.status(200).json({
            message: "User created successfully",
            token: token
        })
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "error creating user" })
    }
}

const userSignin = (req, res, next) => {

}

const updateInfo = (req, res, next) => {

}

module.exports = {
    userSignup,
    userSignin,
    updateInfo,
}