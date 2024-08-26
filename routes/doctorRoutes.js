const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentController, updateStatusController } = require('../controllers/doctorController');

// router
const router = express.Router();

// routes
router.get('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);
router.post('/doctor-appointment', authMiddleware, doctorAppointmentController);
router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;