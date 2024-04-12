import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Services from "../pages/Services";
import UserAuthentication from "../pages/UserAuthentication";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:car_id" element={<CarDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/sign_in" element={<UserAuthentication/>} />
    </Routes>
  );
};

export default Routers;
