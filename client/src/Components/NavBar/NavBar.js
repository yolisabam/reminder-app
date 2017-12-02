import React, { Component } from "react";
import { Link } from "react-router-dom";


class NavBar extends Component {
  state = {

  };

  render() {
    return (
      <div class="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
  
            <ul className="nav navbar-nav">
              <li className={window.location.pathname === "/user"? "active": ""}>
                <Link to="/user">Home</Link>
              </li>
              <li className={window.location.pathname === "/about" ? "active" : ""}>
                <Link to="/about">About</Link>
              </li>
              <li className={window.location.pathname === "/" ? "active" : ""}>
                <Link to="/">Sign Out</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


export default NavBar;

