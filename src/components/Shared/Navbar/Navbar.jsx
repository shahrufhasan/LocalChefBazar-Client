import React from "react";
import logo from "../../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { ImSpinner3 } from "react-icons/im";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

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

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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

          <img src={logo} className="w-12 md:w-fit" alt="Logo" />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{renderLinks()}</ul>
        </div>

        <div className="navbar-end flex gap-2">
          {user ? (
            <div className="relative group">
              <div className="cursor-pointer">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      alt={user?.displayName || "User"}
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                absolute right-0 top-12 w-48 bg-base-100 shadow-lg rounded-lg p-3 z-50
                opacity-0 translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300 ease-in-out flex flex-col
              "
              >
                <span className="font-semibold mb-2 truncate">
                  {user?.displayName || "User"}
                </span>

                <button
                  className="btn btn-outline btn-primary flex items-center gap-2"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(async () => {
                      await handleLogout();
                      setLoading(false);
                    }, 300);
                  }}
                >
                  {loading ? (
                    <ImSpinner3 className="animate-spin text-lg" />
                  ) : (
                    "Log Out"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                className="btn btn-outline btn-primary flex items-center gap-2"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => navigate("/login"), 300);
                }}
              >
                {loading ? (
                  <ImSpinner3 className="animate-spin text-lg" />
                ) : (
                  "Login"
                )}
              </button>

              <button
                className="btn btn-outline flex items-center gap-2"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => navigate("/register"), 300);
                }}
              >
                {loading ? (
                  <ImSpinner3 className="animate-spin text-lg" />
                ) : (
                  "Register"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
