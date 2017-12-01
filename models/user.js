var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: function (email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: [6, 'Password too short'],
    max: 16
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'We need your phone number in order to send you notification']
  }
});

module.exports = mongoose.model("User", userSchema);