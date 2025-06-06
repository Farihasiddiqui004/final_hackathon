const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
