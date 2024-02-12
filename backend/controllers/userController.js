const jwt = require('jsonwebtoken')
const { userSignupSchema, userSigninSchema } = require('../schemas/user')
const User = require("../models/userModel")

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET;

// signing a new user
const userSignup = async (req, res, next) => {
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }

    try {
        // Input validation via zod
        const { success } = userSignupSchema.safeParse(user)

        // db validation for same username
        const existingUser = await User.findOne({ username: user.username })

        if (existingUser) {
            res.status(411).json({
                message: "Email already taken"
            })
        }

        if (!success) {
            res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        // create new user
        const newUser = await User.create(user)
        const userId = newUser._id;
        //sign a new jwt token
        const token = jwt.sign({ userId }, JWT_SECRET)

        res.status(200).json({
            message: "User created successfully",
            token: token
        })
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "error creating user" })
    }
}

//login a user
const userSignin = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        // Input validation via zod
        const { success } = userSigninSchema.safeParse({ username, password })

        if (!success) {
            res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        //find the user
        const user = await User.findOne({ username, password })

        if (user === null) {
            res.status(411).json({
                message: "user does not exist"
            })
        }

        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET)

        res.status(200).json({
            token: token
        })

    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "Error while logging in" })
    }
}

// update the user credentials
const updateInfo = (req, res, next) => {

}

module.exports = {
    userSignup,
    userSignin,
    updateInfo,
}