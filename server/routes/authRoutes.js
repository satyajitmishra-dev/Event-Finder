const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/verify-register-otp', authController.verifyRegisterOtp);
router.post('/login', authController.login);
router.post('/verify-login-otp', authController.verifyLoginOtp);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
