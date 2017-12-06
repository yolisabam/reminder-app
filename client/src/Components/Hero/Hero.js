import React from "react";
import "./Hero.css";

const Hero = props =>
  <section
    className="hero text-center"
    style={{backgroundImage: `url(${props.backgroundImage})`}}
  >
    {props.children}
  </section>;

export default Hero;