const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please provide a userId'],
    },
    doctorId: {
        type: String,
        required: [true, 'Please provide a doctorId'],
    },
    doctorInfo: {
        type: String,
        required: [true, 'Please provide a doctorInfo'],
    },
    userInfo: {
        type: String,
        required: [true, 'Please provide a userInfo'],
    },
    data: {
        type: String,
        required: [true, 'Please provide a data'],
    },
    status: {
        type: String,
        required: [true, 'Please provide a status'],
        default: 'pending',
    },
    time: {
        type: String,
        required: [true, 'Please provide a time'],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('appointments', appointmentSchema);