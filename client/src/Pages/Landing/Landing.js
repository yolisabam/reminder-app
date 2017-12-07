import React from "react";
import LoginForm from "../../Components/LoginForm";
import Hero from "../../Components/Hero";
import "./Landing.css";

const Landing = props =>
  <div>
    <Hero backgroundImage="/assets/backgroundImage.jpg">



    <div className="arrow-container animated fadeInDown">
      <div className="arrow-2">
        <a href='#foo'><i className="glyphicon glyphicon-arrow-down"></i></a>
      </div>
      <div className="arrow-1 animated hinge infinite zoomIn"></div>
    </div>





    </Hero>
    <br></br>
    <br></br>
    <div className="container">
      <div className="col-sm-8 col-sm-offset-2">
        <a id="foo"><LoginForm /></a>
      
      </div>
    </div>
  </div>;

export default Landing;