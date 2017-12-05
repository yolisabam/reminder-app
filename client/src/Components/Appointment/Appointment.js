import React from "react";
import "./Appointment.css";

const Appointment = ({ appt, handleUpdate, handleDelete }) => (
  <div className="panel-body">
    <h5>Appointment Name: {appt.appointmentName}</h5>
    <h5>Appointment Number: {appt.appointmentNumber}</h5>
    {/*<h5>Date: {appt.date}</h5>*/}
    <h5>Date/Time: {appt.time}</h5>
    <h5>Notification: {`${appt.notification} minutes before`}</h5>
    {handleUpdate &&
      <button className="btn btn-default" onClick={() => handleUpdate(appt)}>Update</button>
    }
    {handleDelete &&
      <button className="btn btn-default" onClick={() => handleDelete(appt)}>Delete</button>
    }
  </div>
);

export default Appointment;