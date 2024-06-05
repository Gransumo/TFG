const express = require('express');
const taskController = require('../Controllers/taskController');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/events/:eventId/tasks/', authenticateToken, taskController.getAllTasks);
router.get('/events/:eventId/tasks/:userTaskId', authenticateToken, taskController.getTasks);
router.post('/events/:eventId/tasks', authenticateToken, taskController.createTask);
router.get('/events/:eventId/tasks/:taskId', authenticateToken, taskController.getTask);
router.put('/events/:eventId/tasks/:taskId', authenticateToken, taskController.updateTask);
router.delete('/events/:eventId/tasks/:taskId', authenticateToken, taskController.deleteTask);

module.exports = router;