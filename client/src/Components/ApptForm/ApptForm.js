import React, { Component } from "react";



class ApptForm extends Component {
  render() {
    return(
      <div class="col-md-6 mb-4">
          <div class="card">
              <div class="card-body">
                  <h3 class="text-center default-text py-3"><i class="fa fa-lock"></i> Login:</h3>
                  
                  <div class="md-form">
                      <i class="fa fa-envelope prefix grey-text"></i>
                      <input type="text" id="defaultForm-email" class="form-control"></input>
                      <label for="defaultForm-email">Your email</label>
                  </div>
                  <div class="md-form">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <input type="password" id="defaultForm-pass" class="form-control"></input>
                      <label for="defaultForm-pass">Your password</label>
                  </div>
                  <div class="text-center">
                      <button class="btn btn-default waves-effect waves-light">next</button>
                  </div>
              </div>
          </div>
      </div>
      )
  }
}

export default ApptForm;