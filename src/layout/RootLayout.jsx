import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="h-screen max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <div className="mt-20"></div>
    </div>
  );
};

export default RootLayout;
