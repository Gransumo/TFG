const express = require('express');
const userController = require('../Controllers/userController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/whoami', authenticateToken, userController.whoAmi);
router.get('/get-user/:userRequestId', authenticateToken, userController.getUserById);
router.post('/get-user', authenticateToken, userController.getUser);
router.post('/sign-up', userController.createUser);
router.post('/login', userController.login);
router.post('/get-users-by-ids', userController.getUserListByArrayIds);

module.exports = router;
