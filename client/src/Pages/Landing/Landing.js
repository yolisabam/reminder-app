import React from "react";
import LoginForm from "../../Components/LoginForm";
import Hero from "../../Components/Hero";

const Landing = props =>
  <div>
    <Hero backgroundImage="/assets/backgroundImage.jpg">
    </Hero>
    <br></br>
    <hr></hr>
    <br></br>
    <div className="container">
      <div className="col-sm-8 col-sm-offset-2">
        <LoginForm />
      
      </div>
    </div>
  </div>;

export default Landing;