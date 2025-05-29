const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  description:{ type: String },
  completed:  { type: Boolean, default: false },
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);