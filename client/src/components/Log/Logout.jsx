import React from "react";
import axios from "axios";
import cookie from "js-cookie";

function Logout() {
  const removeCookie = (key) => {
    if (typeof window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8081/api/user/logout",
        withCredentials: true,
      });
      removeCookie("jwt");
    } catch (err) {
      console.log(err);
    }
    window.location = "/";
  };
  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="" />
    </li>
  );
}

export default Logout;
