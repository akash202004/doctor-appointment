const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${mongoose.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
    }
}

module.exports = connectDB;