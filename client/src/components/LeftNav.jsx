import React from "react";
import { NavLink } from "react-router-dom";
import "../style/leftNavBar.css";

function LeftNav() {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" >
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/trending" >
            <img src="./img/icons/rocket.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/profil" >
            <img src="./img/icons/user.svg" alt="home" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
