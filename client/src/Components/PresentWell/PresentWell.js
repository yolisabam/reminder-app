import React, { Component } from "react";
import API from "../../Utils/api";

const Appointment = ({ appt, handleUpdate, handleDelete }) => (
  <div className="panel-body">
    <h5>Appointment Name: {appt.appointmentName}</h5>
    <h5>Appointment Number: {appt.appointmentNumber}</h5>
    <h5>Date: {appt.date}</h5>
    <h5>Time: {appt.time}</h5>
    <h5># of Notification: {appt.notification}</h5>
    {handleUpdate &&
      <button className="btn btn-default" onClick={() => handleUpdate(appt)}>Update</button>
    }
    {handleDelete &&
      <button className="btn btn-default" onClick={() => handleDelete(appt)}>Delete</button>
    }
  </div>
);

class PresentWell extends Component {
  state = {
    appointments: []
  };

  componentWillMount() {
    this.loadAppointments();
  }

  handleDelete = (appt) => {
    const { user } = this.props;
    API.deleteUserAppointment(user._id, appt._id)
      .then(() => {
        this.loadAppointments();
      });
  }

  handleUpdate = (appt) => {

  }

  render() {
    const upcomingAppts = this.getUpcomingAppointments();
    const pastAppts = this.getPastAppointments();
    return (
      <div>
        PresentWell
        <div className="panel panel-default" id="panel">
          {upcomingAppts.map(appt => 
            <Appointment
              appt={appt}
              key={appt._id}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete} />
          )}
        </div>
        Past Well
        <div className="panel panel-default" id="panel">
          {pastAppts.map(appt =>
            <Appointment
              appt={appt}
              key={appt._id}
              handleDelete={this.handleDelete} />
          )}
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
