const mongoose = require('mongoose');
const USer = require("../models/dashuser");

// Create a new user
async function handleCreateNewUser(req, res) {
    const { firstName, lastName, email, password, gender, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: "Please provide all required fields: firstName, lastName, email, password",
        });
    }

    try {
        const existingUser = await USer.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already in use, please choose another one",
            });
        }

        const newUser = await USer.create({
            firstName,
            lastName,
            email,
            password,
            gender,
            jobTitle,
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
}

// Get all users
async function handleGetUser(req, res) {
    try {
        const users = await USer.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
}

// Get user by ID
async function getByUSerID(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid user ID",
        });
    }

    try {
        const user = await USer.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
}

// Update user by ID
async function handleUpdateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password, gender, jobTitle } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid user ID",
        });
    }

    try {
        const updatedUser = await USer.findByIdAndUpdate(
            id,
            { firstName, lastName, email, password, gender, jobTitle },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating user",
            error: error.message,
        });
    }
}

// Delete user by ID
async function handleDeleteUser(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid user ID",
        });
    }

    try {
        const deletedUser = await USer.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting user",
            error: error.message,
        });
    }
}
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await USer.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the input password with the hashed password
        const isMatch = await User.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // If password matches, proceed (e.g., generate token, return success)
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
}
module.exports = {
    handleCreateNewUser,
    handleGetUser,
    getByUSerID,
    handleUpdateUser,
    handleDeleteUser,
    login,
};
