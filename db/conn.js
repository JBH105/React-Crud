const mongoose = require("mongoose");

const connectionURL = "mongodb+srv://bhargesh:bhargesh@cluster0.wkvc5.mongodb.net/crud_task?retryWrites=true&w=majority";

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Connection Succesfully");
    } else {
        console.log("Connection Error");
    }
});
