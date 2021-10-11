const User = require("../models/User")

exports.getUsers = async (req, res) => {
    //res.status(200).json("hii ......")
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.addUser = async (req, res) => {
    const user = req.body;

    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Get a user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
// Save data of edited user in the database
exports.editUser = async (req, res) => {

    const user = req.body;

    const editUser = new User(user);
    try {
        await User.updateOne({ _id: req.params.id }, editUser);
        res.status(201).json(editUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//delete user

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(201).json("User deleted successfully!!!")
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
