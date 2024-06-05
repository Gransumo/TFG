const express = require('express');
const invitationController = require('../Controllers/invitationController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/invitations', authenticateToken, invitationController.getInvitations);
router.post('/events/:eventId/invitations', authenticateToken, invitationController.createInvitation);
router.get('/events/:eventId/invitations/:invitationId', authenticateToken, invitationController.getInvitation);
router.put('/events/:eventId/invitations/:invitationId', authenticateToken, invitationController.updateInvitation);
router.delete('/events/:eventId/invitations/:invitationId', authenticateToken, invitationController.deleteInvitation);

module.exports = router;
