const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// dotenv
dotenv.config()

// db connect
connectDB();

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the API'
    });
})
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));

// load env variables
const port = process.env.PORT || 5000;

// listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`.blue.bold);
})