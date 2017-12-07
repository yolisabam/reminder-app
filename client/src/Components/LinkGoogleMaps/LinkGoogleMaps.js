import React, { Component } from "react";
import "./LinkGoogleMaps.css";



class LinkGoogleMaps extends Component {
  render() {
    return (
      <div className="animated bounceInLeft">

        <a className="sample" href="https://www.google.com/maps/dir/Current+Location/" target="_blank">
        <span className="text">link to google maps</span>
        <span className="line -right"></span>
        <span className="line -top"></span>
        <span className="line -left"></span>
        <span className="line -bottom"></span>
       </a>


      </div>

    )
  };
}


export default LinkGoogleMaps;


    