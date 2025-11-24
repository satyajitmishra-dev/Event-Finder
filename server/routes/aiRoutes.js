const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/chat', authMiddleware, aiController.chat);
router.get('/recommendations', authMiddleware, aiController.getRecommendations);

module.exports = router;
