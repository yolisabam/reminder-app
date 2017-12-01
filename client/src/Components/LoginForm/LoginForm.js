import React, { Component } from "react";
import axios from "axios";
import "./LoginForm.css";
import API from "../../Utils/api";

class LoginForm extends Component {
  state = {
    loginEmail : "",
    loginPassword : "",
    isLoginEmailEmpty : false,
    isLoginPasswordEmpty : false,
    isValidEmail: true,
    isValidPassword : true,
    signUpFirstName : "",
    signUpLastName : "",
    signUpEmail : "",
    signUpPassword : "",
    signUpPhone : "",
    isSignUpFirstNameEmpty : false,
    isSignUpLastNameEmpty : false,
    isSignUpEmailEmpty : false,
    isSignUpPasswordEmpty : false,
    isSignUpPhoneEmpty : false,
    isUniqueEmail : true,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value.trim()
    });
    
  };

  handleLoginFormSubmit = event => {
    //prevent page from refreshing by default
    event.preventDefault();

    //perform client-side form validations
    if(!this.state.loginEmail) {
      this.setState({isLoginEmailEmpty : true});
    }

    if(!this.state.loginPassword) {
      this.setState({isLoginPasswordEmpty : true});
    }

    //if email and password are both provided
    if ( this.state.loginEmail && this.state.loginPassword) {
      API.getUser({
        email : this.state.loginEmail,
        password : this.state.loginPassword
      })
        .then(res => {
          console.log(res);
          //if email and password are valid
          if (res.isEmailValid && res.isPasswordValid) {
            //submit a GET request for "/home"
            axios.get("/user");
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

  handleSignupFormSubmit = event => {
    //prevent page from refreshing by default
    event.preventDefault();

  };

  render() {
    console.log(this.state);
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
                  <input 
                    value={this.state.signUpFirstName}
                    name="signUpFirstName"
                    onChange={this.handleInputChange}
                    type="text" 
                    className="form-control" 
                    placeholder="first name" 
                    aria-describedby="basic-addon1">
                  </input>
                  <div id="error-first-name-left-empty" className={!this.state.isSignUpFirstNameEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                    <p className="error text-center">Please provide your first name!</p>
                  </div>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Last Name</span>
                  <input 
                    value={this.state.signUpLastName}
                    name="signUpLastName"
                    onChange={this.handleInputChange}
                    type="text" 
                    className="form-control" 
                    placeholder="last name" 
                    aria-describedby="basic-addon1">
                  </input>
                  <div id="error-last-name-left-empty" className={!this.state.isSignUpLastNameEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                    <p className="error text-center">Please provide your last name!</p>
                  </div>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Email</span>
                  <input 
                    value={this.state.signUpEmail}
                    name="signUpEmail"
                    onChange={this.handleInputChange}
                    type="email" 
                    className="form-control" 
                    placeholder="email" 
                    aria-describedby="basic-addon1"></input>
                  <div id="error-email-left-empty" className={!this.state.isSignUpEmailEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                    <p className="error text-center">Please provide your email!</p>
                  </div>
                  <div id="error-password-incorrect" className={this.state.isUniqueEmail ? "error-div-signup invisible" : "error-div-signup"}>
                    <p className="error text-center">The email provided was already used! Please enter a different email address.</p>
                  </div>
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Password</span>
                  <input 
                    value={this.state.signUpPassword}
                    name="signUpPassword"
                    onChange={this.handleInputChange}
                    type="password" 
                    className="form-control" 
                    placeholder="password" 
                    aria-describedby="basic-addon1"></input>
                  <div id="error-password-left-empty" className={!this.state.isSignUpPasswordEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                    <p className="error text-center">Please provide your password!</p>
                  </div>  
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">Mobile Number</span>
                  <input 
                    value={this.state.signUpPhone}
                    name="signUpPhone"
                    onChange={this.handleInputChange}
                    type="phonenumber" 
                    className="form-control" 
                    placeholder="123-456-7899" 
                    aria-describedby="basic-addon1"></input>
                  <div id="error-phone-left-empty" className={!this.state.isSignUpPhoneEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                    <p className="error text-center">Please provide your mobile number!</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-default" 
                  data-toggle="modal" 
                  data-target="#signup" 
                  data-dismiss="modal"
                  id="signup-submit"
                  onClick={this.handleSignupFormSubmit}
                >Submit</button>
              </div>
            </div>
          </div>
        </div>

        {/*Signup Form*/}
        <div className="panel panel-info">
          <div className="panel-body">
            <form role="form" className="form-horizontal">  
              <div className="form-group">
                <label for="inputUserName" className="col-sm-4 control-label">Email</label>
                <div className="col-sm-6">
                  <input 
                    value={this.state.loginEmail}
                    name="loginEmail"
                    onChange={this.handleInputChange}
                    type="text" 
                    className="form-control" 
                    id="input-email" 
                    placeholder="name@email.com"></input>
                </div>
                <div id="error-email-left-empty" className={!this.state.isLoginEmailEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">Please enter your email address!</p>
                </div>
                <br></br>
                <div id="error-username-not-exist" className={this.state.isValidEmail ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">This username does not exist!</p>
                </div>
              </div>
              <div className="form-group">
                <label for="inputPassword" className="col-sm-4 control-label">Password</label>
                <div className="col-sm-6">
                  <input  
                    value={this.state.loginPassword}
                    name="loginPassword"
                    onChange={this.handleInputChange}
                    type="password" 
                    className="form-control" 
                    id="input-password" 
                    placeholder="password">
                  </input>
                </div>
                <div id="error-password-left-empty" className={!this.state.isLoginPasswordEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">Please enter your password!</p>
                </div>
                <div id="error-password-incorrect" className={this.state.isValidPassword ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">The password is incorrect!</p>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-6">
                  <button 
                    type="submit" 
                    className="btn btn-default" 
                    id="login-submit"
                    onClick={this.handleLoginFormSubmit}
                    >Sign in</button>
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
