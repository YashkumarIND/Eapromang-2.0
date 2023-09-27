const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  teamMembers: {
    type: [String], // This defines teamMembers as an array of strings
    required: true,
    trim: true,
  },
  creator: {
    type:String,
    required:true,
    unique:false,
    trim:true,
  }
});

const Teams = mongoose.model('Teams', teamsSchema);

module.exports = Teams;
