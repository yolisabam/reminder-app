import React, { Component } from "react";
import Hero from "../../Components/Hero";
import "./User.css";
import NavBar from "../../Components/NavBar";
import ApptForm from "../../Components/ApptForm";
import SimpleForm from "../../Components/Map"
import AppointmentsWell from "../../Components/AppointmentsWell";
import Cookies2 from "js-cookie";
import MapRender from "../../Components/Map";
<<<<<<< HEAD
=======
import LinkGoogleMaps from "../../Components/LinkGoogleMaps";
>>>>>>> master

class User extends Component {

  render() {
    const user = Cookies2.getJSON('user');
    console.log(this.state);
    return (
      <div class="wrapper">
        <NavBar />
        <Hero backgroundImage="/assets/background.jpg">
          <ApptForm user={user} />
          {/*<SimpleForm />*/}
          <MapRender />
        </Hero>
        <div>
<<<<<<< HEAD
          <AppointmentsWell user={user}/>
        </div>  
=======
          <Hero backgroundImage="/assets/background.jpg">

              <ApptForm user={user} />
              <LinkGoogleMaps />
              {/*<SimpleForm />*/}
              <MapRender />
          </Hero>
        </div>
        <AppointmentsWell user={user}/>
>>>>>>> master
        <br></br>
        <br></br>
    </div>
    );
  }
}

export default User;