const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const globalEventController = require('../controllers/globalEventController');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

router.get('/', eventController.getEvents);
router.get('/global', authMiddleware, globalEventController.getGlobalEvents);
router.get('/my', authMiddleware, eventController.getMyEvents);
router.get('/:id', (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        return eventController.getEventById(req, res, next);
    } else {
        return globalEventController.getGlobalEventById(req, res, next);
    }
});
router.post('/', authMiddleware, eventController.createEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);
router.post('/:id/join', authMiddleware, eventController.joinEvent);
router.post('/:id/leave', authMiddleware, eventController.leaveEvent);

module.exports = router;
