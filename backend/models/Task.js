const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   title:   String,
  public:  { type: Boolean, default: false },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deadline: {
    type: Date,
    default: null
  }
  
});

module.exports = mongoose.model('Task', taskSchema);