const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
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
    type : String,
    required: true
    validate: function (v) {
      return /([01]\d|2[0-3]):?[0-5]\d/.test(v);
    },
    message: '{VALUE} is not a valid time format!',
    required: [true, 'We need your time input in order to send you notification'],
  },
  notificationPhoneNumber: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: '{VALUE} is not a valid phone number!'
    // },
    required: true//[true, 'We need your phone number in order to send you notification']
},
notification: {
  type: Number,
  required: true
}
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

