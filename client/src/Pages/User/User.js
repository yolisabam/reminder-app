import React, { Component } from "react";
import Hero from "../../Components/Hero";
import "./User.css";
import NavBar from "../../Components/NavBar";
import ApptForm from "../../Components/ApptForm";
import SimpleForm from "../../Components/Map"
import AppointmentsWell from "../../Components/AppointmentsWell"
import Cookies2 from "js-cookie";
import MapRender from "../../Components/Map"

class User extends Component {

  render() {
    const user = Cookies2.getJSON('user');
    //console.log(user);
    return (
      <div class="wrapper">
        <NavBar />
        <div>
          <Hero backgroundImage="https://images.crutchfieldonline.com/ImageHandler/scale/978/978/products/2014/41/158/x158NWZA17S-o_lifestyle.jpg">
              <ApptForm user={user} />
              {/*<SimpleForm />*/}
              <MapRender />
          </Hero>
        </div>
        <AppointmentsWell user={user}/>
        <br></br>
        <br></br>
    </div>
    );
  }
}

export default User;