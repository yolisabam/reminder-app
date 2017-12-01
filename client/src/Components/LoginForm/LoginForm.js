import React, { Component } from "react";
import axios from "axios";
import "./LoginForm.css";
import api from "../../Utils/api";

class LoginForm extends Component {
  state = {
    loginEmail : "",
    loginPassword : "",
    isValidEmail: false,
    isValidPassword : false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value.trim()
    });
  };

  handleFormSubmit = event => {
    //prevent page from refreshing by default
    event.preventDefault();
    //if email and password are both provided
    if ( this.state.loginEmail && this.state.loginPassword) {
      api.checkUserCredentials({
        email : this.state.loginEmail,
        password : this.state.loginPassword
      })
        .then(res => {
          //if email and password are valid
          if (res.isEmailValid && res.isPasswordValid) {
            //submit a GET request for "/home"
            axios.get("/home");
          } 
          //else if email provided isn't in the db
          else if (!res.isEmailValid) {
            //update state
            this.setState({
              isValidEmail: false
            });
          }
          //else if password provided doesn't match what's in the db
          else if (!res.isPasswordValid) {
            //update state 
            this.setState({
              isValidPassword: false
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <div className="modal fade" id="signup" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Sign Up Form</h4>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">First Name </span>
                  <input type="text" className="form-control" placeholder="first name" aria-describedby="basic-addon1"></input>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Last Name</span>
                  <input type="text" className="form-control" placeholder="last name" aria-describedby="basic-addon1"></input>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Email</span>
                  <input type="email" className="form-control" placeholder="email" aria-describedby="basic-addon1"></input>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Password</span>
                  <input type="password" className="form-control" placeholder="password" aria-describedby="basic-addon1"></input>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Phone Number</span>
                  <input type="phonenumber" className="form-control" placeholder="123-456-7899" aria-describedby="basic-addon1"></input>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-toggle="modal" data-target="#signup" data-dismiss="modal">Submit</button>
              </div>
            </div>
          </div>
        </div>

        {/*Signup Form*/}
        <div className="panel panel-info">
          <div className="panel-body">
            <form role="form" className="form-horizontal">  
              <div className="form-group">
                <label for="inputUserName" className="col-sm-4 control-label">User Name</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id="input-user-name" placeholder="username"></input>
                </div>
              </div>
              <div id="error-username-not-exist" className={this.state.isValidEmail ? "error-div-signup invisible" : "error-div-signup"}>
                <p className="error text-center">This username does not exist!</p>
              </div>
              <div className="form-group">
                <label for="inputPassword" className="col-sm-4 control-label">Password</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" id="input-password" placeholder="password"></input>
                </div>
              </div>
               <div id="error-password-incorrect" className={this.state.isValidPassword ? "error-div-signup invisible" : "error-div-signup"}>
                <p className="error text-center">The password is incorrect!</p>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-6">
                  <button type="submit" className="btn btn-default" id="login-submit">Sign in</button>
                  <hr></hr>
                  <p id="need-acct">Need an account?<span><a href="#" id="sign-up" data-toggle="modal" data-target="#signup" data-dismiss="modal">&nbsp;&nbsp;&nbsp;SIGN UP</a></span></p>
                </div>
              </div>
            </form>    
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
