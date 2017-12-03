import React, { Component } from "react";
import "./ApptForm.css";



class ApptForm extends Component {
  
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Appointment Form</h3>
              </div>
              <div class="panel-body">
                <div class="form">
                  <input type="text" id="appt_name" class="form-control" placeholder="appointment name"></input>
                </div>
                <br></br>
                <div class="form">
                  <input type="text" id="date" class="form-control" placeholder="date"></input>
                </div>
                <br></br>
                <div class="form">
                  <input type="text" id="time" class="form-control" placeholder="time"></input>
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