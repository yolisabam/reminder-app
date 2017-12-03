import React, { Component } from "react";
import Hero from "../../Components/Hero";
import "./User.css";
import NavBar from "../../Components/NavBar";
import ApptForm from "../../Components/ApptForm";
import SimpleForm from "../../Components/Map"
import PresentWell from "../../Components/present-well"
class User extends Component {
  state = {

  };

  render() {
    return (
      <div class="container">
        <NavBar />
          <div>

            <Hero backgroundImage="https://images.crutchfieldonline.com/ImageHandler/scale/978/978/products/2014/41/158/x158NWZA17S-o_lifestyle.jpg">
                <h1>Welcome to the User Page!</h1>
                <h2>You will see and set up your appointments in this page</h2>
                <ApptForm />
                <SimpleForm />
            </Hero>
          </div>
        <PresentWell />
        <br></br>
        <br></br>
        <hr></hr>
        <h1>There will be a form here!!!</h1>
      </div>
    );
  }
}

export default User;