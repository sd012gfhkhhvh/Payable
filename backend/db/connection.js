const mongoose = require('mongoose')
// const path = require('path');
// const dotenv = require('dotenv')
// // Adjust the path to point to the root directory
// dotenv.config({ path: path.join(__dirname, '..', '.env') });

const DB_URI = process.env.DB_URI

const dbName = "payable-db"

mongoose.connect(DB_URI + dbName)
    .then(() => {
        console.log("Connected to database " + dbName);
    })
    .catch((err) => {
        console.log(err.message);
    })

module.exports = mongoose;
