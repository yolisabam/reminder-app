import React, { Component } from "react";
import API from "../../Utils/api";
import "./ApptForm.css";

class ApptForm extends Component {
  state = {
    apptName : "",
    apptDate : "",
    apptTime : "",
    apptNotification : "",
    apptNotificationNumber : "",
    isApptNameEmpty : false,
    isApptNotificationNumberEmpty : false,
    isApptNotificationEmpty : false,
    isApptDateEmpty : false,
    isApptTimeEmpty : false
  };

  componentWillMount() {
    const {
      user, 
      apptName,
      apptDate,
      apptTime,
      apptNotification,
      apptNotificationNumber
    } = this.props;

    //set the user cookie state
    this.setState({ 
      apptName: apptName || '',
      apptDate: apptDate || '',
      apptTime: apptTime || '',
      apptNotification: apptNotification || '',
      apptNotificationNumber: apptNotificationNumber || user.mobileNumber
    });
  }

  componentDidMount() {
    //if there is no user cookie, reroute to the login page
    if(!this.props.user) {
      window.location.href = "/";
    } 

    else {
      console.log("I have a cookie, so I can access this page");
    } 
  }

  handleInputChange = event => {
    //update the state for every key stroke inside the input elements
    const { name , value } = event.target;
    this.setState({
      [name] : value.trim()
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const createNewApptStates = [
      { input : this.state.apptName , validation : "isApptNameEmpty"},
      { input : this.state.apptNotificationNumber, validation : "isApptNotificationNumberEmpty"},
      { input : this.state.apptDate , validation : "isApptDateEmpty"},
      { input : this.state.apptTime , validation : "isApptTimeEmpty"},
      { input : this.state.apptNotification, validation : "isApptNotificationEmpty"}
    ];

    //if any of the input values are empty
    if (!this.state.apptName || !this.state.apptNotificationNumber || !this.state.apptDate ||!this.state.apptTime || !this.state.apptNotification) {
      //set the validation states to their appropriate values
      //set the validation states to their appropriate values
      createNewApptStates.forEach(stateElement => {
      (stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true})
      });
    } 
    //else if all input values are not empty
    else if (this.state.apptName && this.state.apptDate && this.state.apptTime && this.state.apptNotification && this.state.apptNotificationNumber  ) {

      if (this.props.apptId) {
        console.log("I am now about to update my appointment");
        API.updateUserAppointment(this.props.user._id, this.props.apptId, {
          appointmentName: this.state.apptName,
          date: this.state.apptDate,
          time: this.state.apptTime,
          appointmentNumber: this.state.apptNotificationNumber,
          notification: this.state.apptNotification
        })
          .then(res => {
            console.log(res);
            //empty out the input elements
            this.setState({
              apptName: "",
              apptDate: "",
              apptTime: "",
              apptNumber: ""
            });
            console.log(this.props.handleSubmit);
            this.props.handleSubmit && this.props.handleSubmit();
          })
          .catch(err => console.log(err))
      } else {
        console.log("I am now about to create my appointment");
        API.saveUserAppointment(this.props.user._id, {
          appointmentName: this.state.apptName,
          date: this.state.apptDate,
          time: this.state.apptTime,
          appointmentNumber: this.state.apptNotificationNumber,
          notification: this.state.apptNotification
        })
          .then(res => {
            console.log(res);
            //empty out the input elements
            this.setState({
              apptName: "",
              apptDate: "",
              apptTime: "",
              apptNumber: ""
            });

            this.props.handleSubmit && this.props.handleSubmit();
          })
          .catch(err => console.log(err))
      } 
    }
  };
  
  render() {
    console.log(this.state);
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">{`Greetings ${this.props.user.firstName}, let's set up your notification(s)`}</h3>
              </div>
              <div class="panel-body">
                <div class="form">
                  <input 
                    name="apptName"
                    value={this.state.apptName}
                    onChange={this.handleInputChange}
                    type="text" 
                    id="appt_name" 
                    className="form-control" 
                    placeholder="Appointment Name">
                  </input>
                  <div id="error-appt-name-left-empty" className={!this.state.isApptNameEmpty ? "error-div-appt-name invisible" : "error-div-appt-name"}>
                    <p className="error text-center">Please provide your appointment name!</p>
                  </div>
                </div>
                <br></br>
                <div class="form">
                  <input 
                    name="apptDate"
                    value={this.state.apptDate}
                    onChange={this.handleInputChange}
                    type="text" 
                    id="date" 
                    className="form-control" 
                    placeholder="date">
                  </input>
                  <div id="error-appt-date-left-empty" className={!this.state.isApptDateEmpty ? "error-div-appt-date invisible" : "error-div-appt-date"}>
                    <p className="error text-center">Please provide your appointment date!</p>
                  </div>
                </div>
                <br></br>
                <div class="form">
                  <input 
                    name="apptTime"
                    value={this.state.apptTime}
                    onChange={this.handleInputChange}
                    type="text" 
                    id="time" 
                    class="form-control" 
                    placeholder="time">
                  </input>
                  <div id="error-appt-time-left-empty" className={!this.state.isApptTimeEmpty ? "error-div-appt-time invisible" : "error-div-appt-time"}>
                    <p className="error text-center">Please provide your appointment time!</p>
                  </div>
                </div>
                <br></br>
                <div class="form">
                  <input 
                    name="apptNotificationNumber"
                    value={this.state.apptNotificationNumber}
                    onChange={this.handleInputChange}
                    type="text" 
                    id="appt_notif_num" 
                    className="form-control" 
                    placeholder="Notification Phone Number">
                  </input>
                  <div id="error-appt-name-left-empty" className={!this.state.isApptNameEmpty ? "error-div-appt-name invisible" : "error-div-appt-name"}>
                    <p className="error text-center">Please provide your appointment name!</p>
                  </div>
                </div>
                <br></br>
                <div class="form">
                  <input 
                    name="apptNotification"
                    value={this.state.apptNotification}
                    onChange={this.handleInputChange}
                    type="text" 
                    id="time" 
                    class="form-control" 
                    placeholder="Appointment Notification">
                  </input>
                  <div id="error-appt-notification-left-empty" className={!this.state.isApptNotificationEmpty ? "error-div-appt-notification invisible" : "error-div-appt-notification"}>
                    <p className="error text-center">Please provide your appointment notification!</p>
                  </div>
                  <br></br>
                  {/*<div className="modal-footer">*/}
                  <hr></hr>
                  <button 
                    type="submit" 
                    className="btn btn-default" 
                    id="appt-submit"
                    onClick={this.handleFormSubmit}
                  >Submit</button>
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default ApptForm;
