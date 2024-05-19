const express = require('express');
const friendRequestController = require('../Controllers/friendRequestController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/friend-requests', authenticateToken, friendRequestController.sendFriendRequest);
router.get('/accept-friend-request', authenticateToken, friendRequestController.acceptFriendRequest);
router.get('/reject-friend-request', authenticateToken, friendRequestController.rejectFriendRequest);

module.exports = router;