import React, { Component } from "react";
import API from "../../Utils/api";
import "./ApptForm.css";
import Cookies2 from "js-cookie";
import DatePicker from "react-datepicker";
import moment from "moment";

//css for date picker
import 'react-datepicker/dist/react-datepicker.css';

class ApptForm extends Component {
  state = {
    userId : "",
    apptName : "",
    apptDate : moment(),
    // apptTime : "",
    apptNotification : "",
    apptNotificationNumber : "",
    isApptNameEmpty : false,
    isApptNotificationNumberEmpty : false,
    isApptNotificationEmpty : false,
    isApptDateEmpty : false,
    isApptTimeEmpty : false,
    upcomingAppts : [],
    pastAppts : [],
    userCookie : ""
  };

  getUpcomingAppts() {

  }

  getPastAppts() {

  }

  componentWillMount() {
    //set the user cookie state
    this.setState(
      { userCookie : Cookies2.getJSON('user'),
        apptNotificationNumber : Cookies2.getJSON('user').mobileNumber
    });
  }

  // componentWillMount() {
  //   //set the user cookie state
  //    if(!Cookies2.get('user')) {
  //     window.location.href = "/";
  //   } 
  // }

  componentDidMount() {
    //if there is no user cookie, reroute to the login page
    if( !this.state.userCookie) {
      window.location.href = "/";
    } 

    else {
      console.log("I have a cookie, so I can access this page");
      //this.getUpcomingAppts();
      //this.getPastAppts();
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
      // { input : this.state.apptTime , validation : "isApptTimeEmpty"},
      { input : this.state.apptNotification, validation : "isApptNotificationEmpty"}
    ];

    //if any of the input values are empty
    if (!this.state.apptName || !this.state.apptNotificationNumber || !this.state.apptDate || !this.state.apptNotification) {
      //set the validation states to their appropriate values
      //set the validation states to their appropriate values
      createNewApptStates.forEach(stateElement => {
      (stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true})
      });
    } 
    //else if all input values are not empty
    else if (this.state.apptName && this.state.apptDate  && this.state.apptNotification && this.state.apptNotificationNumber) {
      console.log("I am now about to create my appointment");
      API.saveUserAppointment( this.state.userCookie._id,{
        appointmentName : this.state.apptName,
        date : this.state.apptDate,
        // time : this.state.apptTime,
        appointmentNumber : this.state.apptNotificationNumber,
        notification : this.state.apptNotification
      })
      .then(res => {
        console.log(res);
        //empty out the input elements
        this.setState({
          apptName : "",
          apptDate : "",
          // apptTime : "",
          apptNotification : ""
          //apptNotificationNumber : "",
        });
      })
      .catch(err => console.log(err))
    }
  };

  //handleChange from date picker
  handleDateChange = date => {
    this.setState({
      apptDate : date
    });
  };
  
  render() {
    console.log(this.state);
    //console.log(this.state.apptDate.format('LLL'));  
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">{`Greetings ${this.state.userCookie.firstName}, let's set up your notification(s)`}</h3>
              </div>
              <div className="panel-body">
                <form className="form-horizontal"> 
                  <div className="form-group">
                    <label className="control-label col-sm-5" for="appt-name">Appointment Name</label>
                    <div className="col-sm-7">
                      <input 
                        name="apptName"
                        value={this.state.apptName}
                        onChange={this.handleInputChange}
                        type="text" 
                        id="appt-name" 
                        className="form-control" 
                        placeholder="Appointment Name">
                      </input>
                    </div>  
                    <div id="error-appt-name-left-empty" className={!this.state.isApptNameEmpty ? "error-div-appt-name invisible" : "error-div-appt-name"}>
                      <p className="error text-center">Please provide your appointment name!</p>
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group">
                    {/*}
                    <input 
                      name="apptDate"
                      value={this.state.apptDate}
                      onChange={this.handleInputChange}
                      type="text" 
                      id="date" 
                      className="form-control" 
                      placeholder="date">
                    </input>
                    */}
                    <label className="control-label col-sm-5" for="appt-date">Appointment Date</label>
                    <div className="col-sm-7">  
                      <DatePicker
                        id="appt-date"
                        selected={this.state.apptDate}
                        onChange={this.handleDateChange}
                        showTimeSelect
                        dateFormat="LLL"
                        className="col-sm-12"
                      />
                    </div>  
                    <div id="error-appt-date-left-empty" className={!this.state.isApptDateEmpty ? "error-div-appt-date invisible" : "error-div-appt-date"}>
                      <p className="error text-center">Please provide your appointment date!</p>
                    </div>
                  </div>
                  <br></br>
                  {/*
                  <div className="form-group">
                    <label className="control-label col-sm-4" for="appt-time">Appointment Time</label>
                    <div className="col-sm-8">
                      <input 
                        name="apptTime"
                        value={this.state.apptTime}
                        onChange={this.handleInputChange}
                        type="text" 
                        id="appt-time" 
                        className="form-control" 
                        placeholder="time">
                      </input>
                    </div>  
                    <div id="error-appt-time-left-empty" className={!this.state.isApptTimeEmpty ? "error-div-appt-time invisible" : "error-div-appt-time"}>
                      <p className="error text-center">Please provide your appointment time!</p>
                    </div>
                  </div>
                  <br></br>
                  */}
                  <div className="form-group">
                    <label className="control-label col-sm-5" for="appt-notif-num">Mobile Number</label>
                    <div className="col-sm-7">
                      <input 
                        name="apptNotificationNumber"
                        value={this.state.apptNotificationNumber}
                        onChange={this.handleInputChange}
                        type="text" 
                        id="appt-notif-num" 
                        className="form-control" 
                        placeholder="Notification Phone Number">
                      </input>
                    </div>  
                    <div id="error-appt-name-left-empty" className={!this.state.isApptNameEmpty ? "error-div-appt-name invisible" : "error-div-appt-name"}>
                      <p className="error text-center">Please provide your mobile number!</p>
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <label className="control-label col-sm-5" for="notif-sched">Notification Schedule</label>
                    <div className="col-sm-7">  
                      <input 
                        name="apptNotification"
                        value={this.state.apptNotification}
                        onChange={this.handleInputChange}
                        type="text" 
                        id="notif-sched" 
                        className="form-control" 
                        placeholder="Appointment Notification">
                      </input>
                    </div>  
                    <div id="error-appt-notification-left-empty" className={!this.state.isApptNotificationEmpty ? "error-div-appt-notification invisible" : "error-div-appt-notification"}>
                      <p className="error text-center">Please provide your notification schedule!</p>
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
                </form>    
              </div>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default ApptForm;