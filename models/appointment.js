const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');

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
    message: '{VALUE} is not a valid time format!',
    required: [true, 'We need your time input in order to send you notification'],
  },

notification: {
  type: Number,
  required: true
}
}); 

appointmentSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time))
                          .diff(moment(date))
                          .asMinutes()) === this.notification;
};

appointmentSchema.statics.sendNotifications = function(cb) {
  const searchDate = new Date();
  Appointment
    .find()
    .then(function(appointments) {
      appointments = appointments.filter(function(appointment){
        return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        sendNotifications(appointment);
      }
    });

}


module.exports = mongoose.model("Appointment", appointmentSchema);