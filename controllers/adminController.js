const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

// get all users controller
const getAllUsersController = async (_, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({ success: true, message: "users data", data: users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get All Users Controller ${error.message}` });
    }
};

// get all doctors controller
const getAllDoctorsController = async (_, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({ success: true, message: "doctors data", data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get All Doctors Controller ${error.message}` });
    }
};

// change account status controller
const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByAndUpdate(doctorId, { status });
        const user = await userModel.findOne({ _id: doctor.userId });
        const notification = user.notifications;
        notification.push({
            type: "doctor-account-request-updated",
            message: `Your Doctor Account Request Has ${status}`,
            onClickPath: "/notification"
        })
        user.isDoctor = status === 'approved' ? true : false
        await user.save();
        res.status(200).send({ success: true, message: "Doctor Account Status Updated Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Change Account Status Controller ${error.message}` });
    }
}

module.exports = { getAllUsersController, getAllDoctorsController, changeAccountStatusController }