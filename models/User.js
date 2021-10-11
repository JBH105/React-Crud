const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },  
    
        email: {
            type: String,
            unique: true,
            required: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Enter Valid Email Address...");
                }
            },
        },
        role: {
            type: String,
            required: true
        },

    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;