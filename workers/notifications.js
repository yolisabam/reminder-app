const Appointment = require('../models/appointment');

const notifications = functions() {
  return {
    run: function() {
      Appointment.sendNotifications();
    
    },
  };
};

module.exports = notifications();