const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");;
const app = express();

dotenv.config()

PORT = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})