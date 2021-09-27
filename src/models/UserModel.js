const mongoose = require('mongoose');

// model structure for database
const userSchema = mongoose.Schema({
  name: {
    type: String, required: true, minlength: 3, maxlength: 50,
  },
  email: {
    type: String, required: true, minlength: 3, maxlength: 100,
  },
  password: {
    type: String, required: true, minlength: 6, maxlength: 100,
  },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
