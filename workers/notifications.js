const Appointment = require('../models/Appointment');

const notifications = function() {
  return {
    run: function() {
      Appointment.sendNotifications();
      Appointment.updateNotifications();
    },
  };
};

module.exports = notifications();