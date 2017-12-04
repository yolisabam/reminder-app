import React, { Component } from "react";
import API from "../../Utils/api";

const Appointment = ({ appts, handleUpdate, handleDelete }) => (
  appts.map(appt =>
    <div className="panel-body" key={appt._id}>
      <h5>Appointment Name: {appt.appointmentName}</h5>
      <h5>Appointment Number: {appt.appointmentNumber}</h5>
      <h5>Date: {appt.date}</h5>
      <h5>Time: {appt.time}</h5>
      <h5># of Notification: {appt.notification}</h5>
      <button className="btn btn-default" onClick={handleUpdate}>Update</button>
      <button className="btn btn-default" onClick={handleDelete}>Delete</button>
    </div>
  )
);

class PresentWell extends Component {
  state = {
    appointments: []
  };

  componentWillMount() {
    this.loadAppointments();
  }

  render() {
    const upcomingAppts = this.getUpcomingAppointments();
    const pastAppts = this.getPastAppointments();
    return (
      <div>
        PresentWell
        <div className="panel panel-default" id="panel">
          <Appointment appts={upcomingAppts} />
        </div>
        Past Well
        <div className="panel panel-default" id="panel">
          <Appointment appts={pastAppts} />
        </div>
      </div>
    );
  }

  loadAppointments() {
    API.getUserAppointments(this.props.user._id)
      .then(res => {
        this.setState({ appointments: res.data });
      })
      .catch(err => console.error(err));
  }

  getUpcomingAppointments() {
    return this.state.appointments.filter(appt => appt.notification > 0);
  }

  getPastAppointments() {
    return this.state.appointments.filter(appt => appt.notification <= 0);
  }
}

export default PresentWell;
