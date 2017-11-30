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
                <p id="need-acct">Need an account?<span><a href="#" id="sign-up">&nbsp;&nbsp;&nbsp;SIGN UP</a></span></p>
              </div>
            </div>
          </form>    
        </div>
      </div>
    );
  }
}

export default LoginForm;
