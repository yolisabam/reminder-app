import React from "react";
import Hero from "../../Components/Hero";
import "./About.css";
import NavBar from "../../Components/NavBar";

const About = () =>
  <div>
  <NavBar />
   <div className="container">
     <div className="row">
      <div className="col-md-3">
        <a href="http://yolisa-bam.com/"><img className="img-circle" img width="200px" height="200px" src="/assets/yolisa.jpg" alt="Cinque Terre"></img></a>
        <div className="caption">
          <p>Yolisa</p>
        </div>
      </div>
      <div className="col-md-3">
        <a href="http://winfredsunga.com"><img className="img-circle" img width="200px" height="200px" src="/assets/WinfredSungaPic.jpg" alt="Cinque Terre"></img></a>
        <div className="caption">
          <p>Winfred</p>
        </div>
      </div>
      <div className="col-md-3">
        <a href="http://jamesreantillo.com/portfolio/"><img className="img-circle" img width="200px" height="200px" src="/assets/James.JPG" alt="Cinque Terre"></img></a>
        <div className="caption">
          <p>James</p>
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
   {/*end test about*/}    
 </div>  
    





  
export default About;
