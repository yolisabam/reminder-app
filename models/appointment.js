const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  appointmentName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    set: function (v) {
      return new Date(v.getFullYear(), v.getMonth(), v.getDate());
    }
  },
  time: {
    validator: function (v) {
      return /([01]\d|2[0-3]):?[0-5]\d/.test(v);
    },
    message: '{VALUE} is not a valid time format!'
  },
  required: [true, 'We need your time input in order to send you notification'],
});

module.exports = mongoose.model("Appointment", articleSchema);