const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user schema
const userdashSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
        },
        gender: {
            type: String,
        },
    },
    { timestamps: true }
);

// Hash password before saving the user
userdashSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare input password with hashed password stored in database
userdashSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create the user model
const Userdash = mongoose.model('Userdash', userdashSchema);
module.exports = Userdash;
