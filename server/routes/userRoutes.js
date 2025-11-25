const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, upload.single('avatar'), updateProfile);

module.exports = router;
