const zod = require('zod');

const transactionSchema = zod.object({
    from: zod.string(),
    to: zod.string(),
    amount: zod.number(),
})

module.exports = {
    transactionSchema
}