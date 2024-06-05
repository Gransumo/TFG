const express = require('express');
const memberController = require('../Controllers/memberController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/events/:eventId/members', authenticateToken, memberController.getMembers);
router.post('/events/:eventId/members', authenticateToken, memberController.createMember);
router.get('/events/:eventId/members/:memberId', authenticateToken, memberController.getMember);
router.put('/events/:eventId/members/:memberId', authenticateToken, memberController.updateMember);
router.delete('/events/:eventId/members/:memberId', authenticateToken, memberController.deleteMember);

module.exports = router;
