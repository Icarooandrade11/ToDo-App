const Task = require('../models/Task');

// Public tasks
exports.getPublicTasks = async (req, res) => {
  const tasks = await Task.find({ visibility: 'public' }).sort({ createdAt: -1 });
  res.json(tasks);
};

// Private (user) tasks
exports.getUserTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, visibility } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const task = await Task.create({
    title, description, visibility, user: req.user._id
  });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const { title, description, completed, visibility } = req.body;
  Object.assign(task, { title, description, completed, visibility });
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};