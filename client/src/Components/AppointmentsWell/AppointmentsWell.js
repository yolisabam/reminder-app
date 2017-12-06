import React, { Component } from "react";
import Modal from 'react-modal';
import API from "../../Utils/api";
import ApptForm from "../ApptForm";
import Appointment from "../Appointment";

class AppointmentsWell extends Component {
  state = {
    apptId: '',
    apptName: '',
    //apptDate: '',
    apptTime: '',
    apptNotification: '',
    apptNotificationNumber: '',
    apptNotificationLabel: '',
    appointments: [],
    isModalOpen: false,
  }

  componentWillMount() {
    this.loadAppointments();
    //this.setState({ appointments : this.props.appointments });
  }

  handleDelete = (appt) => {
    const { user } = this.props;
    API.deleteUserAppointment(user._id, appt._id)
      .then(() => {
        this.loadAppointments();
      });
  }

  handleUpdate = (appt) => {
    this.setState({
      apptId: appt._id,
      apptName: appt.appointmentName,
      //apptDate: appt.date,
      apptTime: appt.time,
      apptNotification: appt.notification,
      apptNotificationNumber: appt.appointmentNumber,
      apptNotificationLabel: appt.apptNotificationLabel,
      isModalOpen: true
    });
  }

  onUpdateAppointment = () => {
    this.setState({
      apptId: '',
      apptName: '',
      //apptDate: '',
      apptTime: '',
      apptNotification: '',
      apptNotificationLabel: '',
      apptNotificationNumber: '',
      isModalOpen: false
    });
    this.loadAppointments();

    console.log('onupdate appointment')
  }

  loadAppointments = () => {
    console.log("I am trying to load my appointments");

    API.getUserAppointments(this.props.user._id)
      .then(res => {
        console.log("I got my appointments back!!!");
        console.log(res.data[0].appointments);
        this.setState({ appointments: res.data[0].appointments });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { user } = this.props;
    const {
      apptId,
      apptName,
      //apptDate,
      apptTime,
      apptNotification,
      apptNotificationNumber, 
      apptNotificationLabel } = this.state;
    const upcomingAppts = this.getUpcomingAppointments();
    const pastAppts = this.getPastAppointments();
    return (
      <div>

       {/*test well*/}

       <div className="container">
         
          <h4 className="animated headShake">Upcoming Appointments</h4>
          <div className="well" id="upcoming-well">
            {upcomingAppts.map(appt => 
              <Appointment
                appt={appt}
                key={appt._id}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete} />
            )}
          </div>
          <h4 className="animated headShake">Past Appointments</h4>
          <div className="well" id="past-well">
            {pastAppts.map(appt =>
              <Appointment
                appt={appt}
                key={appt._id}
                handleDelete={this.handleDelete} />
            )}
          </div>
          <Modal isOpen={this.state.isModalOpen}>
            <ApptForm user={user}
              apptId={apptId}
              apptName={apptName}
              //apptDate={apptDate}
              apptTime={apptTime}
              apptNotification={apptNotification}
              apptNotificationNumber={apptNotificationNumber}
              handleSubmit={this.onUpdateAppointment} />
          </Modal>
             
       </div>





        {/*test well*/}

        {/*<h4>Upcoming Appointments</h4>
        <div className="well" id="upcoming-well">
          {upcomingAppts.map(appt => 
            <Appointment
              appt={appt}
              key={appt._id}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete} />
          )}
        </div>
        <h4>Past Appointments</h4>
        <div className="well" id="past-well">
          {pastAppts.map(appt =>
            <Appointment
              appt={appt}
              key={appt._id}
              handleDelete={this.handleDelete} />
          )}
        </div>
        <Modal isOpen={this.state.isModalOpen}>
          <ApptForm user={user}
            apptId={apptId}
            apptName={apptName}
            //apptDate={apptDate}
            apptTime={apptTime}
            apptNotification={apptNotification}
            apptNotificationNumber={apptNotificationNumber}
            apptNotificationLabel={apptNotificationLabel}
            handleSubmit={this.onUpdateAppointment} />
        </Modal>*/}
      </div>
    );
  }

  getUpcomingAppointments() {
    return this.state.appointments.filter(appt => appt.notification > 0);
  }

  getPastAppointments() {
    return this.state.appointments.filter(appt => appt.notification <= 0);
  }
}

export default AppointmentsWell;
