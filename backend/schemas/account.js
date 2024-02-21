const zod = require('zod');

const transactionSchema = zod.object({
    to: zod.string(),
    amount: zod.number(),
})

module.exports = {
    transactionSchema
}