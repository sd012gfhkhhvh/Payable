const jwt = require('jsonwebtoken')
const { userSignupSchema, userSigninSchema, userUpdateSchema } = require('../schemas/user')
const User = require("../models/user")

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
        const { success } = userSignupSchema.safeParse(req.body)

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
        const { success } = userSigninSchema.safeParse(req.body)

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
const updateInfo = async (req, res, next) => {

    //get the userId from the userAuthmiddleware
    const userId = req.userId;

    try {
        // Input validation via zod
        const { success } = userUpdateSchema.safeParse(req.body)

        if (!success) {
            res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        // find and update on db
        const updatedUser = await User.findByIdAndUpdate(userId, req.body)

        res.status(200).json({ message: "Updated successfully" })

    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "Error while updating information" })
    }
}

// filter via firstName/lastName
const filterUser = async (req, res, next) => {
    const filterObj = req.query.filter || ""; // ?filter=soham

    try {
        const users = await User.find(
            {
                $or: [{
                    firstName: {
                        "$regex": filterObj
                    }
                }, {
                    lastName: {
                        "$regex": filterObj
                    }
                }]
            },
            // select objects
            { firstName: 1, lastName: 1 } // return users with the field mentioned(id is by default included)
        ).toArray();

        //TODO: what does find returns if there is no user found. Ans: [] (empty array) for 'find' and null for 'findOne'
        if (users.length) {
            res.status(404).json({ message: "user not found" })
            return;
        }

        res.status(200).json(
            {
                users: users
            }
        )

    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: "Error while updating information" })
    }
}

module.exports = {
    userSignup,
    userSignin,
    updateInfo,
    filterUser,
}