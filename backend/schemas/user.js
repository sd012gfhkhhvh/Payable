const zod = require('zod');

const userSignupSchema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(6, { message: "Must be 6 or more characters long" }),
    firstName: zod.string().max(50, { message: "Must be 50 or fewer characters long" }),
    lastName: zod.string().max(50, { message: "Must be 50 or fewer characters long" }),
})

const userSigninSchema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(6, { message: "Must be 6 or more characters long" }),
})

const userUpdateSchema = zod.object({
    password: zod.string().min(6, { message: "Must be 6 or more characters long" }).optional(),
    firstName: zod.string().max(50, { message: "Must be 50 or fewer characters long" }).optional(),
    lastName: zod.string().max(50, { message: "Must be 50 or fewer characters long" }).optional(),
})

module.exports = {
    userSignupSchema,
    userSigninSchema,
    userUpdateSchema
}