import React from "react";
import Hero from "../../Components/Hero";
import "./About.css";
import NavBar from "../../Components/NavBar";
import Jumbotron from "../../Components/Jumbotron";

const About = () =>
  <div>
  <NavBar />
  <Jumbotron>
  <h1>ABOUT US</h1>
  <h6>WE BUILT REMIND.ME TO HELP BUSY PEOPLE SEND TEXT REMINDERS FOR THINGS THAT MATTER</h6>
  </Jumbotron>
   <div className="container">   
     <div className="row">
      <h2>Our Team</h2>
  
      <div className="col-md-3">
        <a href="http://yolisa-bam.com/"><img className="img-circle" img width="200px" height="200px" src="/assets/yolisa.jpg" alt="Cinque Terre"></img></a>
        <div className="caption">
          <p>Yolisa</p>
          <a href="http://github.com/yolisabam"><img  src="/assets/github.png" alt="github"></img></a>

        </div>
      </div>
      <div className="col-md-3">
        <a href="http://winfredsunga.com"><img className="img-circle" img width="200px" height="200px" src="/assets/WinfredSungaPic.jpg" alt="Cinque Terre"></img></a>
        <div className="caption">
          <p>Winfred</p>
          <a href="http://github.com/jamesreantillo"><img  src="/assets/github.png" alt="github"></img></a>
        </div>
      </div>
      <div className="col-md-3">
        <a href="http://jamesreantillo.com/portfolio/"><img className="img-circle" img width="200px" height="200px" src="/assets/James.JPG" alt="Cinque Terre"></img></a>
        <div className="caption">
          <p>James</p>
          <a href="http://github.com/jamesreantillo"><img  src="/assets/github.png" alt="github"></img></a>
        </div>
      </div>
      <div className="col-md-3">
        <a href="https://fathao.github.io/Alex-Z/"><img className="img-circle" img width="200px" height="200px" src="/assets/Alex.jpg" alt="Cinque Terre"></img></a>
         <div className="caption">
          <p>Alex</p>
        </div>
      </div>

     </div>
   </div>     
 </div>  
    





  
export default About;
