const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
