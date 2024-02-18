import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "../../pages/Trending";
import Profil from "../../pages/Profil";
import Home from "../../pages/Home";
import NavBar from "../NavBar";

function index() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
}

export default index;
