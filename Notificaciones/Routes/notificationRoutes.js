const express = require('express');
const notificationController = require('../Controllers/notificationController');
const authMiddleware = require('../Middleware/authMiddleware');
const Routes = express.Router();


Routes.get('/notifications', authMiddleware, notificationController.getAllNotifications);
Routes.post('/notifications', notificationController.createNotification);
Routes.put('/notifications/:id', authMiddleware, notificationController.setReadNotification);

module.exports = Routes;
