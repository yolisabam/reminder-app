'use strict';

const CronJob = require('cron').CronJob;
const moment = require('moment');  
const notification = require('./workers/notifications ');

const schedulerTimer = () => {
  return {
    start: function(){
      new CronJob('00 * * * * *', function(){ 
        console.log("Running send notfication worker for" + moment().format());
        notification.run();

      }, null, true, '');
    },
  };
};



module.exports = schedulerTimer(); 
