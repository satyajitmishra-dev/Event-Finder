const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const globalEventController = require('../controllers/globalEventController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', eventController.getEvents);
router.get('/global', authMiddleware, globalEventController.getGlobalEvents);
router.get('/my', authMiddleware, eventController.getMyEvents);
router.get('/:id', eventController.getEventById);
router.post('/', authMiddleware, eventController.createEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);
router.post('/:id/join', authMiddleware, eventController.joinEvent);
router.post('/:id/leave', authMiddleware, eventController.leaveEvent);

module.exports = router;
