import React from "react";
import LoginForm from "../../Components/LoginForm";
import Hero from "../../Components/Hero";

const Landing = props =>
  <div>
    <Hero>
        <h1>Twilio Text</h1>
        <h2>ABOUT US</h2>
    </Hero>
    <div className="container">
      <div className="col-sm-6 col-sm-offset-3">
        
        <LoginForm />
      </div>
    </div>
  </div>;

export default Landing;