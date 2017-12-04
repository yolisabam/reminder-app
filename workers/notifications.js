const Appointment = require('../models/appointment');

const notifications = function() {
  return {
    run: function() {
      Appointment.sendNotifications();
    
    },
  };
};

module.exports = notifications();