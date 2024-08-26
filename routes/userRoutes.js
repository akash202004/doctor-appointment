const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvaibilityController, userAppointmentsController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// router
const router = express.Router();

// user routes
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUserData', authMiddleware, authController);

// doctor routes
router.post("/apply-doctor", authMiddleware, applyDoctorController);
router.post("/get-all-notification", authMiddleware, getAllNotificationController);
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
router.post("/book-appointment", authMiddleware, bookAppointmentController);
router.post("/booking-avaibility", authMiddleware, bookingAvaibilityController);
router.get("/user-appoinments", authMiddleware, userAppointmentsController);

module.exports = router;