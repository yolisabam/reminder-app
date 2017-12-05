const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');
const config = require('../config')

const appointmentSchema = new mongoose.Schema({
  appointmentName: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required : true
    // validate: function (v) {
    //   return new Date(v.getFullYear(), v.getMonth(), v.getDate());
    //}
  },
  // time: {
  //   type : String,                               
  //   validate: function (v) {
  //     return /([01]\d|2[0-3]):?[0-5]\d/.test(v);
  //   },
  //   message: '{VALUE} is not a valid time format!',
  //   required: [true, 'We need your time input in order to send you notification'],
  // },
  appointmentNumber: {
    type: String,
    required:true
  },
  notification: {
    type: Number,
    required: true
  },
  notificationLabel: {
    type: String,
    required: true
  }
}); 

appointmentSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time).utc()
                          .diff(moment(date).utc())
                          ).asMinutes()) === this.notification;
};

appointmentSchema.statics.sendNotifications = function(cb) {
  const searchDate = new Date();
  console.log('searchDate : ' + searchDate);
  Appointment
    .find()
    .then(function(appointments) {
      appointments = appointments.filter(function(appointment){
        return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        console.log("I FOUND AN APPOINTMENT!!!");
        sendNotifications(appointments);
      } else {
        console.log("duration");
        console.log(Math.round(moment.duration(moment("2017-12-05T07:53:41.095Z").utc()
                          .diff(moment(searchDate).utc())
                          ).asMinutes()));
      }
    });

    function sendNotifications(appointments) {
      const client = new Twilio(config.twilioAccountSid, config.twilioAuthToken);
      appointments.forEach(function(appointment) {
        const message = {
          to: `+1${appointment.appointmentNumber}`,
          from: config.twilioPhoneNumber,
          body: `Hi! Just a quick reminder that ${appointment.appointmentName} is coming up !`,
        };

        client.messages.create(message, function(err, res){
          if(err) {
            console.log(err);
          } else {
            let phoneNumber = appointment.appointmentNumber;
            console.log(`Reminder sent to ${phoneNumber}`);
          }
        });
      });
      if(cb) {
        cb.call();
      }
    }
};

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
