import React from "react";
import logo from "../../../assets/logo.png";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const location = useLocation();
  const activePath = location.pathname;

  const renderLinks = () =>
    links.map((item) => (
      <li key={item.path}>
        <Link
          to={item.path}
          className={`block px-3 mx-1 py-2 rounded
          ${
            activePath === item.path
              ? "bg-green-400 text-white"
              : "text-base-content hover:bg-green-400 hover:text-white transition-colors duration-300"
          }`}
        >
          {item.name}
        </Link>
      </li>
    ));

  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-2 px-4">
        <div className="navbar-start flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              {renderLinks()}
            </ul>
          </div>
          {/* Logo */}
          <img src={logo} className="w-12 md:w-fit" alt="Logo" />
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{renderLinks()}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex gap-2">
          <Link to="/login" className="btn btn-outline btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
