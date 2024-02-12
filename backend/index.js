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

//handle undefined routes
app.all("*", (req, res) => {
    res.status(404).json({message: "route not found"})
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({message: "server broke !!"})
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})

