const Task = require('../models/Task');
const User = require('../models/user');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    // Check if the assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create and save the new task
    const newTask = new Task({
      title,
      description,
      assignedTo,
      status: 'To Do',  // Default status when the task is created
    });

    await newTask.save();
    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email'); // Populate assigned user info
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// Update task status (Move task to To Do, In Progress, Done)
exports.updateTaskStatus = async (req, res) => {
    const { status } = req.body;
    const taskId = req.params.id;
  
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
  
    if (!['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    try {
      const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

// Edit a task (Update title, description, assigned user)
exports.editTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update task fields if provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.assignedTo = assignedTo || task.assignedTo;

    await task.save();
    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (err) {
    console.error('Error editing task:', err);
    res.status(500).json({ message: 'Server error while editing task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({
      message: 'Task deleted successfully',
      taskId
    });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
