import React from "react";
import LoginForm from "../../Components/LoginForm";
import Hero from "../../Components/Hero";

const Landing = props =>
  <div>
    {/*<Hero backgroundImage="https://images.crutchfieldonline.com/ImageHandler/scale/978/978/products/2014/41/158/x158NWZA17S-o_lifestyle.jpg">
        <h1>Twilio Text</h1>
        <h2>ABOUT US</h2>
    </Hero>
    <br></br>
    <hr></hr>
    <br></br>*/}
    <div className="container">
      <div className="col-sm-8 col-sm-offset-2">
        <LoginForm />
      
      </div>
    </div>
  </div>;

export default Landing;