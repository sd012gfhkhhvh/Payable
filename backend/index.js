const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const rootRouter = require("./routes")

const app = express();
dotenv.config()
PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

//route
app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})

