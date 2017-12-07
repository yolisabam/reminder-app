import React from "react";
import "./Appointment.css";
import moment from "moment-timezone";

const Appointment = ({ appt, handleUpdate, handleDelete, handleRenderMap}) => (
  <div className="panel-body panel-body-upcoming-appts" >
    <h5>Appointment Name: {appt.appointmentName}</h5>
    <h5>Address : {appt.address}</h5>
    <h5>Notification Phone Number: {`(${appt.appointmentNumber.split('').slice(0,3).join('')}) ${appt.appointmentNumber.split('').slice(3,6).join('')}-${appt.appointmentNumber.split('').slice(6).join('')}`}</h5>
    <h5>Date/Time: {moment.tz(appt.time, appt.timeZone).format('MMMM Do YYYY, h:mm A')}</h5>
    <h5>Notification: {`${appt.notificationLabel} before`}</h5>
    {handleUpdate &&
      <button className="btn btn-default" onClick={() => handleUpdate(appt)}>Update</button>
    } &nbsp;
    {handleDelete &&
      <button className="btn btn-default" onClick={() => handleDelete(appt)}>Delete</button>
    }
  </div>
);

export default Appointment;