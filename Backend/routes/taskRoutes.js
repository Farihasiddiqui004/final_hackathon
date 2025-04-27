const express = require('express');
const {
  createTask,
  getTasks,
  updateTaskStatus,
  editTask,
  deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import authMiddleware
const router = express.Router();

// Create a new task
router.post('/tasks', authMiddleware, createTask); // Protect this route with authMiddleware

// Get all tasks
router.get('/tasks', authMiddleware, getTasks); // Protect this route with authMiddleware

// Update task status (Move task to To Do, In Progress, Done)
router.put('/tasks/:id/status', authMiddleware, updateTaskStatus); // Protect this route with authMiddleware

// Edit a task (Update title, description, assigned user)
router.put('/tasks/:id', authMiddleware, editTask); // Protect this route with authMiddleware

// Delete a task
router.delete('/tasks/:id', authMiddleware, deleteTask); // Protect this route with authMiddleware

module.exports = router;
