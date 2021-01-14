const userController = {};

const User = require('../models/User')

userController.getUser =
    async (req, res) => {
        const users = await User.find();
        res.json(users)
    }

userController.createUser =
    async (req, res) => {
        const {username} = req.body;
        const newUser = new User({
            username: username
        })
        await newUser.save();
        res.json({message: "User created"})
    }

userController.deleteUser =
    async (req, res) => {
        await User.findOneAndDelete(req.params.id);
        res.json({message: "User deleted"})
    }

module.exports = userController