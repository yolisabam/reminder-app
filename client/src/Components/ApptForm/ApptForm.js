import React, { Component } from "react";
import "./ApptForm.css";



class ApptForm extends Component {
  
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Appointment Form</h3>
              </div>
              <div className="panel-body">
                <div className="form">
                  <input type="text" id="appt_name" className="form-control" placeholder="appointment name"></input>
                </div>
                <br></br>
                <div className="form">
                  <input type="text" id="date" className="form-control" placeholder="date"></input>
                </div>
                <br></br>
                <div className="form">
                  <input type="text" id="time" className="form-control" placeholder="time"></input>
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