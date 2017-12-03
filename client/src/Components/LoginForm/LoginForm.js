import React, { Component } from "react";
import axios from "axios";
import "./LoginForm.css";
import API from "../../Utils/api";
import Modal from 'react-modal';

class LoginForm extends Component {
  state = {
    //states for existing user login input elements values
    loginEmail : "",
    loginPassword : "",
    //states to aid in validating existing user login 
    isLoginEmailEmpty : false,
    isLoginPasswordEmpty : false,
    isValidEmail: true,
    isValidPassword : true,
    emailValidate: function (email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    },
    //states for new user input values
    signUpFirstName : "",
    signUpLastName : "",
    signUpEmail : "",
    signUpPassword : "",
    signUpPhone : "",
    //states to aid validating new user input values
    isSignUpFirstNameEmpty : false,
    isSignUpLastNameEmpty : false,
    isSignUpEmailEmpty : false,
    isSignUpPasswordEmpty : false,
    isSignUpPhoneEmpty : false,
    isEmailUnique : true,

    //open/close state for the modal
    modalIsOpen : false
  };

  openModal = () =>
    this.setState({ modalIsOpen : true });


  closeModal = () => 
    this.setState({ modalIsOpen : false });


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value.trim()
    });
    
  };

  handleLoginFormSubmit = event => {
    //prevent page from refreshing by default
    event.preventDefault();

    //assign the input value and validation states in this array of objects
    const loginUserStates = [
      { input : this.state.loginEmail, validation : "isLoginEmailEmpty" },
      { input : this.state.loginPassword, validation : "isLoginPasswordEmpty" }
    ];

    loginUserStates.forEach(stateElement => {
      (stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true})
    });

    //if all client-side input validations pass
    if (this.state.loginEmail && this.state.loginPassword) {
      //send a request to the server for the provided user login credentials
      API.getUser({
        email : this.state.loginEmail,
        password : this.state.loginPassword
      })
      .then(res => {
        console.log(res);
        //if email and password are valid
        if (res.data.isValidEmail && res.data.isValidPassword) {
          //submit a GET request for "/home"
          //axios.get("/user");
          window.location.href = "/user";
        } 
        //else if email provided isn't in the db
        else if (!res.data.isValidEmail) {
          //update state
          this.setState({
            isValidEmail: false
          });
        }
        //else if password provided doesn't match what's in the db
        else if (!res.isValidPassword) {
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

    console.log("I clicked the save new user button");

    //assign the input value and validation states in this array of objects
    const createNewUserStates = [
    { input : this.state.signUpFirstName, validation : "isSignUpFirstNameEmpty"},
    { input : this.state.signUpLastName, validation : "isSignUpLastNameEmpty"},
    { input : this.state.signUpEmail, validation : "isSignUpEmailEmpty"},
    { input : this.state.signUpPassword, validation : "isSignUpPasswordEmpty"},
    { input : this.state.signUpPhone, validation : "isSignUpPhoneEmpty"}
    ];

    //if any of the input values are empty
    if (!this.state.signUpFirstName || !this.state.signUpLastName || !this.state.signUpEmail || !this.state.signUpPassword || !this.state.signUpPhone) {
      //set the validation states to their appropriate values
      createNewUserStates.forEach(stateElement => {
      (stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true})
      });
    } 
    //else if all input values are not empty
    else if (this.state.signUpFirstName && this.state.signUpLastName && this.state.signUpEmail && this.state.signUpPassword && this.state.signUpPhone && this.state.isEmailUnique && this.state.emailValidate) 
    {
      API.saveUser({
        firstName : this.state.signUpFirstName,
        lastName : this.state.signUpLastName,
        email : this.state.signUpEmail,
        password : this.state.signUpPassword,
        mobileNumber : this.state.signUpPhone
      })
      .then(res => {
        console.log(res);
        (res.data.isEmailUnique) ? this.closeModal() : this.setState({ isEmailUnique : false })
      })
      .catch(err => console.log(err));
    }
  };

  render() {
    //console.log(this.state);
    return (
      <div>
        <Modal 
          className="col-sm-6 col-sm-offset-3"
          isOpen={this.state.modalIsOpen}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal}>&times;</button>
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
                <div id="error-password-incorrect" className={this.state.isEmailUnique ? "error-div-signup invisible" : "error-div-signup"}>
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
                type="submit" 
                className="btn btn-default" 
                data-toggle="modal" 
                data-target="#signup" 
                data-dismiss="modal"
                id="signup-submit"
                onClick={this.handleSignupFormSubmit}
              >Submit</button>
            </div>
          </div>
        </Modal>
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
                  <p className="error text-center">This email does not exist!</p>
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
                  <p id="need-acct">Need an account?<span><a href="#" id="sign-up" onClick={this.openModal}>&nbsp;&nbsp;&nbsp;SIGN UP</a></span></p>
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
