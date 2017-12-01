import React from "react";
import "./Hero.css";

const Hero = props =>
  <section
    className="text-center"
    id="hero"
  >
    {props.children}
  </section>;

export default Hero;