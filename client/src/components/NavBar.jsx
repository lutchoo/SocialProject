import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
import "../style/navBar.css";

function NavBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.currentUser.user);
  // if (userData) console.log(userData.pseudo);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="" />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                {userData && <h5>Bienvenue {userData.pseudo}</h5>}
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src="./img/icons/login.svg" alt="logo login" />
                <h5></h5>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
