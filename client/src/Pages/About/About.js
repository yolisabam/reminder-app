import React from "react";
import Hero from "../../Components/Hero";
import "./About.css";
import NavBar from "../../Components/NavBar";

const About = () =>
  <div>
  <NavBar />
      <Hero className="hero" backgroundImage="https://images.crutchfieldonline.com/ImageHandler/scale/978/978/products/2014/41/158/x158NWZA17S-o_lifestyle.jpg">
        <h1>Twilio Text</h1>
        <h2>ABOUT US</h2>
      </Hero>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <div className=".img-rounded">
            <a href="http://yolisa-bam.com/"><img className="img-circle" img width="300px" height="300px"  src="https://ginnodangan.files.wordpress.com/2011/04/gintamaop9-02.jpg" alt="Cinque Terre"></img></a>  
          <div className="caption">
            <p>Yolisa</p>
          </div>
          </div>
         </div> 

      <div className="col-md-6">
        <div className=".img-rounded">
            <a href="http://winfredsunga.com"><img className="img-circle" img width="300px" height="300px" src="https://ginnodangan.files.wordpress.com/2011/04/gintamaop9-03.jpg" alt="Cinque Terre"></img></a>
          <div className="caption">
            <p>Winfred</p>
          </div>
        </div>
      </div>
    </div> 

    <div className="row">
      <div className="col-md-6">
        <div className=".img-rounded">
            <a href="http://jamesreantillo.com/portfolio/"><img className="img-circle" img width="300px" height="300px" src="http://i0.kym-cdn.com/photos/images/original/000/427/974/846.png" alt="Cinque Terre"></img></a>
          <div className="caption">
            <p>James</p>
          </div>
        </div>
      </div>

      <div className="col-md-6"> 
        <div className=".img-rounded">
            <a href="https://fathao.github.io/Alex-Z/"><img className="img-circle" img width="300px" height="300px" src="http://wfiles.brothersoft.com/g/gintoki_79205-1600x1200.jpg" alt="Cinque Terre"></img></a>
          <div className="caption">
            <p>Alex</p>
          </div>
        </div>
      </div>
    </div>
   </div>          
 </div>  
    





  
export default About;
