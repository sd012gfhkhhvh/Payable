const zod = require('zod');

const userSignupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
})

const userSigninSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
})

module.exports = {
    userSignupSchema,
    userSigninSchema
}