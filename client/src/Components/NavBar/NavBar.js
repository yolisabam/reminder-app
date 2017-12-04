import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies2 from "js-cookie";

class NavBar extends Component {
  state = {

  };

  handleSignOut = () =>
    //delete user cookie upon sign out
    Cookies2.remove('user')


  render() {
    return (
      <div class="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
  
            <ul className="nav navbar-nav">
              <li className={window.location.pathname === "/user" ? "active" : ""}>
                <Link to="/user">Home</Link>
              </li>
              <li className={window.location.pathname === "/about" ? "active" : ""}>
                <Link to="/about">About</Link>
              </li>
              <li className={window.location.pathname === "/" ? "active" : ""}>
                <Link to="/" onClick={this.handleSignOut}>Sign Out</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


export default NavBar;

