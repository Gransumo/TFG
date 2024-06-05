const express = require('express');
const eventController = require('../Controllers/eventController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/events', authenticateToken, eventController.getEvents);
router.post('/events', authenticateToken, eventController.createEvent);
router.get('/events/:eventCode', authenticateToken, eventController.getEvent);
router.put('/events/:eventId', authenticateToken, eventController.updateEvent);
router.delete('/events/:eventId', authenticateToken, eventController.deleteEvent);

module.exports = router;
