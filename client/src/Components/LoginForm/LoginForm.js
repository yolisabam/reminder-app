import React, { Component } from "react";
import "./LoginForm.css";
import API from "../../Utils/api";
import Modal from 'react-modal';
import Cookies2 from "js-cookie";

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

    //states for new user input values
    signUpFirstName : "",
    signUpLastName : "",
    signUpEmail : "",
    signUpPassword : "",
    signUpPhone : "",
    emailValidation : "",
    //states to aid validating new user input values
    isSignUpFirstNameEmpty : false,
    isSignUpLastNameEmpty : false,
    isSignUpEmailEmpty : false,
    isSignUpPasswordEmpty : false,
    isSignUpPhoneEmpty : false,
    isEmailUnique : true,
    isEmailValid : true,

    //open/close state for the modal
    modalIsOpen : false,

    //state for user Cookie
    userCookie : ""

  };

  emailValidate(email) {
    // if email doesn't exist, let it pass
    // otherwise, check if email is valid
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  }

  componentWillMount() {
    //when the component mounts and sees that there is a cookie for your login credential, you are redirected to the user page
    //const Cookies2 = Cookies.noConflict();
    this.setState({ userCookie : Cookies2.get('user') });
  }

  componentDidMount() {
    if(this.state.userCookie) {
      window.location.href = "/user" //: window.location.href = "/"
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleInputChange = event => {
    //update the state for every key stroke inside the input elements
    const { name, value } = event.target;
    this.setState({
      [name] : value.trim()
    });
  };

  handleLoginFormSubmit = event => {
    //prevent page from refreshing by default
    event.preventDefault();

    const newState = {};

    //assign the input value and validation states in this array of objects
    const loginUserStates = [
      { input : this.state.loginEmail, validation : "isLoginEmailEmpty" },
      { input : this.state.loginPassword, validation : "isLoginPasswordEmpty" }
    ];

    loginUserStates.forEach(({input, validation}) => {
      const inputExist = !!input;
      newState[validation] = !inputExist;
    });

    this.setState(newState);
        
    // const emailValidation = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //if all client-side input validations pass
    if (this.state.loginEmail && this.state.loginPassword) {
      //send a request to the server for the provided user login credentials
      API.getUser({
        email : this.state.loginEmail,
        password : this.state.loginPassword
      })
      .then(res => {
        console.log('res', res);
        //if email and password are valid
        if (res.data.isValidEmail && res.data.isValidPassword) {
          //submit a GET request for "/home"
          //axios.get("/user");
          Cookies2.set('user', res.data.userInfo);
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

    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpPhone,
      isEmailUnique
    } = this.state;

    //assign the input value and validation states in this array of objects
    const createNewUserStates = [
      { input : signUpFirstName, validation : "isSignUpFirstNameEmpty"},
      { input : signUpLastName, validation : "isSignUpLastNameEmpty"},
      { input : signUpEmail, validation : "isSignUpEmailEmpty"},
      { input : signUpPassword, validation : "isSignUpPasswordEmpty"},
      { input : signUpPhone, validation : "isSignUpPhoneEmpty"}
    ];

    this.setState({ isEmailValid: !signUpEmail || this.emailValidate(signUpEmail) });

    //if any of the input values are empty
    if (!signUpFirstName || !signUpLastName || !signUpEmail || !signUpPassword || !signUpPhone) {
      //set the validation states to their appropriate values
      createNewUserStates.forEach(stateElement => {
        const inputExist = !!stateElement.input;
        this.setState({ [stateElement.validation]: !inputExist });
      });
    }
    //else if all input values are not empty
    else if (signUpFirstName && signUpLastName && signUpEmail && signUpPassword && signUpPhone && isEmailUnique) 
    {
      API.saveUser({
        firstName : signUpFirstName,
        lastName : signUpLastName,
        email : signUpEmail,
        password : signUpPassword,
        mobileNumber : signUpPhone
      })
      .then(res => {
        console.log('res', res);

        if (res.data.isEmailUnique) {
          this.closeModal();
        } else {
          this.setState({ isEmailUnique: false });
        }
      })
      .catch(err => console.log(err));
    }
  };

  render() {
    console.log('state before render', this.state);
    return (
      <div>
        {/* Sign Up Form */}
        <Modal 
          id="modal"
          className="col-sm-6 col-sm-offset-3 animated pulse"
          isOpen={this.state.modalIsOpen}>
          

      <form id="form" className="topBefore animated headShake">
        <div className="modal-header">
          <button type="button" className="close" onClick={this.closeModal}>&times;</button>
          <h4 id="SignUpForm" className="modal-title">Sign Up Form</h4>
        </div>
        <input id="name" type="text" placeholder="firstname" value={this.state.signUpFirstName} name="signUpFirstName" onChange={this.handleInputChange}  className="loginHover"></input>
            {this.state.isSignUpFirstNameEmpty &&
              <div id="error-first-name-left-empty" className={!this.state.isSignUpFirstNameEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                <p className="error text-center">Please provide your first name!</p>
              </div>
            }
        <input id="name" type="text" placeholder="lastname" value={this.state.signUpLastName} name="signUpLastName" onChange={this.handleInputChange}  className="loginHover"></input>

            {this.state.isSignUpLastNameEmpty &&
              <div id="error-last-name-left-empty" className={!this.state.isSignUpLastNameEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                <p className="error text-center">Please provide your last name!</p>
              </div>
            }
        <input id="name" type="email" placeholder="email" value={this.state.signUpEmail} name="signUpEmail" onChange={this.handleInputChange}  className="loginHover"></input>
            {this.state.isSignUpEmailEmpty &&
              <div id="error-email-left-empty" className="error-div-signup">
                <p className="error text-center">Please provide your email!</p>
              </div>
            }
            {!this.state.isEmailUnique &&
              <div id="error-password-incorrect" className="error-div-signup">
                <p className="error text-center">The email provided was already used! Please enter a different email address.</p>
              </div>
            }
            {!this.state.isEmailValid &&
              <div id="error-password-incorrect" className="error-div-signup">
                <p className="error text-center">Email is not valid!</p>
              </div>
            }
        <input id="name" type="password" placeholder="password" value={this.state.signUpPassword} name="signUpPassword" onChange={this.handleInputChange}  className="loginHover"></input>
            {this.state.isSignUpPasswordEmpty &&
              <div id="error-password-left-empty" className={!this.state.isSignUpPasswordEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                <p className="error text-center">Please provide your password!</p>
              </div>
            }
        <input id="name" type="phonenumber" placeholder="123-456-7899" value={this.state.signUpPhone} name="signUpPhone" onChange={this.handleInputChange}  className="loginHover"></input>
            {this.state.isSignUpPhoneEmpty &&
              <div id="error-phone-left-empty" className={!this.state.isSignUpPhoneEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                <p className="error text-center">Please provide your mobile number!</p>
              </div>
            } 
        <input id="submit" type="submit" value="Submit!" className="loginHover" onClick={this.handleSignupFormSubmit}></input>
      </form>
        </Modal>



      


      {/*sample 2*/}
      <section className="loginSection">

      <header className="animated headShake">Log In</header>
        <form id="form" className="topBefore animated headShake"> 
          <input id="name" type="email" placeholder="email" value={this.state.loginEmail} name="loginEmail" onChange={this.handleInputChange} type="text" id="input-email" className="loginHover"></input>
            {this.state.isLoginEmailEmpty &&
              <div id="error-email-left-empty">
                <p className="error text-center">Please enter your email address!</p>
              </div>
            }
          <input id="email" type="password" placeholder="password" value={this.state.loginPassword} name="loginPassword" onChange={this.handleInputChange} type="password" id="input-password" className="loginHover"></input>
            
            {this.state.isLoginPasswordEmpty &&
              <div id="error-password-left-empty">
                <p className="error text-center">Please enter your password!</p>
              </div>
            }
            {!this.state.isValidPassword &&
              <div id="error-password-incorrect">
                <p className="error text-center">The password is incorrect!</p>
              </div>
            }  
          <input id="submit" type="submit" value="Sign In!" className="loginHover" onClick={this.handleLoginFormSubmit}></input>

          {!this.state.isValidEmail &&
            <div id="error-username-not-exist">
              <p className="error text-center">Sorry! Your email or password is incorrect</p>
            </div>
          }

        </form>
        <div className="col-sm-offset-2 col-sm-5">
          <hr></hr>
          <p id="need-acct" className="animated bounceInLeft">Need an account?<span><a id="sign-up" onClick={this.openModal}>&nbsp;&nbsp;&nbsp;SIGN UP</a></span></p>
        </div>

        </section>


      </div>
    );
  }
}

export default LoginForm;
