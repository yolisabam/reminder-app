const Appointment = require('../models/Appointment');

const notifications = function() {
  return {
    run: function() {
      Appointment.sendNotifications();
    
    },
  };
};

module.exports = notifications();