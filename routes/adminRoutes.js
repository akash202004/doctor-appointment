const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminController');

// router
const router = express.Router();

// admin routes
router.get('/getAllUsers', authMiddleware, getAllUsersController);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController);

module.exports = router;