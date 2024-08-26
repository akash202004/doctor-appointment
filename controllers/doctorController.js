const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

// Get Doctor Info Controller
const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({ success: true, message: "Doctor Info", data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get Doctor Info Controller ${error.message}` });
    }
}

// Update Profile Controller
const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(200).send({ success: true, message: "Doctor Profile Updated", data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Update Profile Controller ${error.message}` });
    }
}

// Get Doctor By Id Controller
const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({ success: true, message: "Doctor Info", data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get Doctor By Id Controller ${error.message}` });
    }
}

// Doctor Appointment Controller
const doctorAppointmentController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.doctorId });
        const appoinments = await appointmentModel.find({ doctorId: req.body.doctorId });
        res.status(200).send({ success: true, message: "Doctor Appointments", data: appoinments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Doctor Appointment Controller ${error.message}` });
    }
}

// Update Status Controller
const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body
        const appointments = await appointmentModel.findOneAndUpdate(appointmentsId, { status })
        const user = await userModel.findOne({ _id: req.body.userInfo.name });
        user.notification.push({
            type: "status-updated",
            message: `A Appointmnet has been updated ${status}`,
            onClickPath: "/doctor-appointments"
        })
        await user.save();
        res.status(200).send({ success: true, message: "Status Updated", data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Update Status Controller ${error.message}` });
    }
}

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentController, updateStatusController }