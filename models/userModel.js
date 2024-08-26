const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    notification: {
        type: Array,
        default: [],
    },
    seenNotification: {
        type: Array,
        default: [],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);