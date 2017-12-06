import React, { Component } from "react";
import API from "../../Utils/api";
import "./ApptForm.css";
//import Cookies2 from "js-cookie";
import DatePicker from "react-datepicker";
import moment from "moment";
//css for date picker
import 'react-datepicker/dist/react-datepicker.css';

//css for react select
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class ApptForm extends Component {
  state = {
    apptName : "",
    //apptDate : moment(),
    apptTime : moment(),
    apptNotification : "",
    apptNotificationLabel : "",
    apptNotificationNumber : "",
    isApptNameEmpty : false,
    isApptNotificationNumberEmpty : false,
    isApptNotificationEmpty : false,
    isApptDateEmpty : false,
    isApptTimeEmpty : false,
    appointments : []
  };

  componentWillMount() {
    const {
      user, 
      apptName,
      //apptDate,
      //apptTime,
      apptNotification,
      apptNotificationLabel,
      apptNotificationNumber 
    } = this.props;

    //set the user cookie state
    this.setState({ 
      apptName: apptName || '',
      //apptDate: apptDate || '',
      apptTime: moment(),
      apptNotification: apptNotification || '',
      apptNotificationNumber: apptNotificationNumber || user.mobileNumber,
      apptNotificationLabel:apptNotificationLabel || ''
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
      [name] : value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const createNewApptStates = [
      { input : this.state.apptName , validation : "isApptNameEmpty"},
      { input : this.state.apptNotificationNumber, validation : "isApptNotificationNumberEmpty"},
      //{ input : this.state.apptDate , validation : "isApptDateEmpty"},
      { input : this.state.apptTime , validation : "isApptTimeEmpty"},
      { input : this.state.apptNotification, validation : "isApptNotificationEmpty"}
    ];

    //if any of the input values are empty
    if (!this.state.apptName || !this.state.apptNotificationNumber || !this.state.apptTime || !this.state.apptNotification) {
      //set the validation states to their appropriate values
      //set the validation states to their appropriate values
      createNewApptStates.forEach(stateElement => {
      (stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true})
      });
    } 
    else if (this.state.apptName && this.state.apptTime && this.state.apptNotification && this.state.apptNotificationNumber  ) {

      if (this.props.apptId) {
        console.log("I am now about to update my appointment");
        API.updateUserAppointment(this.props.user._id, this.props.apptId, {
          appointmentName: this.state.apptName,
          //date: this.state.apptDate,
          time: this.state.apptTime,
          appointmentNumber: this.state.apptNotificationNumber,
          notification: this.state.apptNotification,
          notificationLabel : this.state.apptNotificationLabel
        })
          .then(res => {
            //empty out the input elements
            this.setState({
              apptName: "",
              //apptDate: "",
              apptTime: moment(),
              apptNotification : "",
              apptNotificationLabel : ""
            });
            //this will reload the page and refresh the upcoming appointment well
            window.location.reload();

            //this.props.handleSubmit && this.props.handleSubmit();
          })
          .catch(err => console.log(err))
      } else {
        console.log("I am now about to create my appointment");
        API.saveUserAppointment(this.props.user._id, {
          appointmentName: this.state.apptName,
          //date: this.state.apptDate,
          time: this.state.apptTime,
          appointmentNumber: this.state.apptNotificationNumber,
          notification: this.state.apptNotification,
          notificationLabel : this.state.apptNotificationLabel
        })
          .then(res => {
            //empty out the input elements
            this.setState({
              apptName: "",
              //apptDate: "",
              apptTime: moment(),
              apptNotification : "",
              apptNotificationLabel : ""
            });
            //this will reload the page and refresh the upcoming appointment well
            window.location.reload();

            //this.props.handleSubmit && this.props.handleSubmit();
          })
          .catch(err => console.log(err))
      } 
    }
  };

  //handleChange from date picker
  handleDateChange = date => {
    this.setState({
      apptTime : date
    });
  };
  
  handleNotificationChange = (selectedOption) => {
    this.setState({ 
      apptNotification : selectedOption.value, 
      apptNotificationLabel : selectedOption.label
    });
    console.log(`Selected: ${selectedOption.label}`);
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
    console.log(this.state);
    //console.log(this.state.apptDate.format('LLL'));  

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{`Greetings ${this.props.user.firstName}, let's set up your notification(s)`}</h3>
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
              <label className="control-label col-sm-5" for="appt-date">Appointment Date/Time</label>
              <div className="col-sm-7">  
                <DatePicker
                  id="appt-date"
                  selected={this.state.apptTime}
                  onChange={this.handleDateChange}
                  showTimeSelect
                  dateFormat="LLL"
                  className="col-sm-12"
                />
              </div>  
              <div id="error-appt-date-left-empty" className={!this.state.isApptTimeEmpty ? "error-div-appt-date invisible" : "error-div-appt-date"}>
                <p className="error text-center">Please provide your appointment date and time!</p>
              </div>
            </div>
            <br></br>
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
                <Select
                  name="apptNotification"
                  value={this.state.apptNotification}
                  onChange={this.handleNotificationChange}
                  options={[
                    { value: '2880', label: '2 days' },
                    { value: '1440', label: '1 day' },
                    { value: '120', label: '2 hours' },
                    { value: '30', label: '30 minutes' },
                    { value: '20', label: '20 minutes' },
                    { value: '15', label: '15 minutes' },
                    { value: '10', label: '10 minutes' },
                    { value: '5', label: '5 minutes' },
                    { value: '2', label: '2 minutes' },
                    { value: '1', label: '1 minute' }
                  ]}
                />
              </div>  
              <div id="error-appt-notification-left-empty" className={!this.state.isApptNotificationEmpty ? "error-div-appt-notification invisible" : "error-div-appt-notification"}>
                <p className="error text-center">Please provide your notification schedule!</p>
              </div>
              <button 
                type="submit" 
                className="btn btn-default" 
                id="appt-submit"
                onClick={this.handleFormSubmit}
              >Submit</button>
            </div>
          </form>    
        </div>
      </div> 
    )
  }
}

export default ApptForm;
