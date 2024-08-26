const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');

// Register Controller
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) return res.status(200).send({ success: false, message: 'User already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new userModel({
            ...req.body,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: `Registration Controller ${error.message}` });
    }
};

// login Controller
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(200).send({ success: false, message: 'User not found' });
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(200).send({ success: false, message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ success: true, message: 'User logged in successfully', token })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Login Controller ${error.message}` })
    }
}

// Auth Controller
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        if (!user) return res.status(200).send({ success: false, message: 'User not found' });
        res.status(200).send({
            success: true, message: 'User data fetched successfully ', data: {
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Auth Controller ${error.message}` })
    }
}

// Apply Doctor Controller
const applyDoctorController = async (req, res) => {
    try {
        const newDcotor = await new doctorModel({ ...req.body, status: 'pending' });
        await newDcotor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request', message: `${newDcotor.firstName} ${newDcotor.lastName} Has Applied For A Dcotor Account`, data: {
                doctorId: newDcotor._id,
                name: newDcotor.firstName + " " + newDcotor.lastName,
                onClickPath: "/admin/doctors"
            }
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({ success: true, message: 'Doctor Account Applied Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Apply Doctor Controller ${error.message}` })
    }
}

// Get All Notification Controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        if (!user) return res.status(200).send({ success: false, message: 'User not found' });
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({ success: true, message: 'Notification Fetched Successfully', data: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get All Notification Controller ${error.message}` })
    }
}

// delete All Notification Controller
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.bosy.userId });
        user.notification = [];
        user.seenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({ success: true, message: 'Notification Deleted Successfully', data: updatedUser });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Delete All Notification Controller ${error.message}` })
    }
}

// Get All Doctors Controller
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' });
        res.status(200).send({ success: true, message: 'All Doctors Fetched Successfully', data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get All Doctors Controller ${error.message}` })
    }
}

// Book Appointment Controller
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.dtae, 'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status = 'pending';
        const appointmentModel = new appointmentModel(req.body);
        await appointmentModel.save();
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification.push({
            type: 'New=appoint-request',
            message: `A New Appointment Request Request from ${req.body.userInfo.name}`,
        })
        await user.save();
        res.status(201).send({ success: true, message: 'Appointment Booked Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Book Appointment Controller ${error.message}` })
    }
}

// Booking Avaibility Controller
const bookingAvaibilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YY').toISOString();
        const formTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await appointmentModel.find({ doctorId, date, time: { $gte: formTime, $lte: toTime } });
        if (appointments.length > 0) { return res.status(200).send({ success: false, message: 'Doctor Not Available' }) } else {
            res.status(200).send({ success: true, message: 'Appointment Booked Successfully' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Booking Avaibility Controller ${error.message}` })
    }
}

// User Appointments Controller
const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId });
        res.status(200).send({ success: true, message: 'User Appointments Fetched Successfully', data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `User Appointments Controller ${error.message}` })
    }
}

module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvaibilityController, userAppointmentsController }