const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  assignees: {
    type: [String],
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  progress: {
    type: String,
    enum: ['doing', 'done', 'yet to start'],
    default: 'yet to start',
  },
  // You can add more fields as needed.
});

// Define the Teams schema
const teamsSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  projectDescription: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  teamMembers: {
    type: [String],
    required: true,
    trim: true,
  },
  creator: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: {
    type: [taskSchema], // Array of task documents
    default: [],
  },
});

// Create a Teams model using the schema
const Teams = mongoose.model('Teams', teamsSchema);

module.exports = Teams;
