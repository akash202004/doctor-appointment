const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, 'Please provide a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name']
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Please provide an address']
    },
    specialization: {
        type: String,
        required: [true, 'Please provide a specialization']
    },
    experience: {
        type: String,
        required: [true, 'Please provide an experience']
    },
    feesPerCunsultation: {
        type: Number,
        required: [true, 'Please provide fees per consultation']
    },
    status: {
        type: String,
        default: 'pending'
    },
    timing: {
        type: Object,
        required: [true, 'Eork timing is required']
    },


},
    { timestamps: true }
);

module.exports = mongoose.model('doctors', doctorSchema)