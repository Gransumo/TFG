const express = require('express');
const friendRequestController = require('../Controllers/friendRequestController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.post('/friend-requests', authenticateToken, friendRequestController.sendFriendRequest);
router.get('/friend-requests', authenticateToken, friendRequestController.getFriendRequests);
router.get('/pending-request/:user', authenticateToken, friendRequestController.getPendingRequests);
router.get('/accept-friend-request/:requestId', authenticateToken, friendRequestController.acceptFriendRequest);
router.get('/reject-friend-request/:requestId', authenticateToken, friendRequestController.rejectFriendRequest);

module.exports = router;