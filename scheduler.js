'use strict';

const CronJob = require('cron').CronJob;
const moment = require('moment');  
const notfication = require('./workers/notficationsWorker');

const schedulerTimer = () => {
  return {
    start: function(){
      new CronJob('00 * * * * *', function(){ 




      })
    }
  }



}