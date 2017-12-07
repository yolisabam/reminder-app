import React, { Component } from "react";
import Hero from "../../Components/Hero";
import "./User.css";
import NavBar from "../../Components/NavBar";
import ApptForm from "../../Components/ApptForm";
import SimpleForm from "../../Components/Map"
import AppointmentsWell from "../../Components/AppointmentsWell";
import Cookies2 from "js-cookie";
import MapRender from "../../Components/Map";
import LinkGoogleMaps from "../../Components/LinkGoogleMaps"

class User extends Component {

  render() {
    const user = Cookies2.getJSON('user');
    console.log(this.state);
    return (
      <div className="wrapper">
        <div className="row">
          <NavBar />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Hero className = "clearfix" backgroundImage="/assets/background.jpg">
              <div className="row">
                <div className="col-sm-4">
                  <ApptForm user={user} />
                </div>
                <div className="col-sm-8">
                  <MapRender />
                </div>
              </div>
            </Hero>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-sm-offset-7">
            <LinkGoogleMaps />
          </div>
        </div>
        <div className="row">
          <AppointmentsWell user={user}/>
        </div>  
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default User;