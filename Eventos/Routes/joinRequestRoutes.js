const express = require('express');
const joinRequestController = require('../Controllers/joinRequestController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/events/:eventId/join-requests', authenticateToken, joinRequestController.getJoinRequests);
router.post('/events/:eventId/join-requests', authenticateToken, joinRequestController.createJoinRequest);
router.get('/events/:eventId/join-request', authenticateToken, joinRequestController.getJoinRequest);
router.put('/events/:eventId/join-requests/:joinRequestId', authenticateToken, joinRequestController.updateJoinRequest);
router.delete('/events/:eventId/join-requests/:joinRequestId', authenticateToken, joinRequestController.deleteJoinRequest);

module.exports = router;
