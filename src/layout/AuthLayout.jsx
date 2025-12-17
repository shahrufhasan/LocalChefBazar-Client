import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
