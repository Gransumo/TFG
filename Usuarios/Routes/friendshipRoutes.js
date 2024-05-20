const express = require('express');
const friendshipController = require('../Controllers/friendshipcontroller');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/get-friend-list', authenticateToken, friendshipController.getList);
router.delete('/delete/:friendId', authenticateToken, friendshipController.destroy);

module.exports = router;
