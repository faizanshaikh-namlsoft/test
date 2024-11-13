const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please enter user password']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)