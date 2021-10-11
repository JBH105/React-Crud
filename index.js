const express = require("express");
require("./db/conn")
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/routes")


const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use("/", router)




app.listen(4000, () => {
    console.log("Server running on port 4000.....")
})