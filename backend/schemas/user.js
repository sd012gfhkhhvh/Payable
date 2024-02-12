const zod = require('zod');

const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
})

module.exports = userSchema;