const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//user router
const userRouter = require("./routes/user")

const app = express();
dotenv.config()
PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})