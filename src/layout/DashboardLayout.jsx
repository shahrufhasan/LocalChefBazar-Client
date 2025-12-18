import React, { useState } from "react";
import { Outlet, Link } from "react-router";
import {
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaUtensils, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../hooks/useAxiosPublic";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["current-user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/users?email=${user.email}`);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const userRole = currentUser?.role || "user";

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-base-200">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-primary btn-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-base-100 shadow-lg p-4 
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          flex flex-col justify-between
        `}
      >
        <div>
          <h2 className="text-xl font-bold mb-4 mt-12 lg:mt-0">Dashboard</h2>

          <div className="flex flex-col gap-2">
            {/* USER MENU */}
            {userRole === "user" && (
              <>
                <h3 className="font-semibold mt-2">User Menu</h3>
                <Link
                  to="/dashboard/user/my-profile"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineUser /> My Profile
                </Link>
                <Link
                  to="/dashboard/user/my-orders"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineFileText /> My Orders
                </Link>
                <Link
                  to="/dashboard/user/my-reviews"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineStar /> My Reviews
                </Link>
                <Link
                  to="/dashboard/user/favorite-meal"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineHeart /> Favorite Meals
                </Link>
              </>
            )}

            {/* CHEF MENU */}
            {userRole === "chef" && (
              <>
                <h3 className="font-semibold mt-2">Chef Menu</h3>
                <Link
                  to="/dashboard/chef/my-profile"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineUser /> My Profile
                </Link>
                <Link
                  to="/dashboard/chef/create-meal"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaUtensils /> Create Meal
                </Link>
                <Link
                  to="/dashboard/chef/my-meals"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaBoxOpen /> My Meals
                </Link>
                <Link
                  to="/dashboard/chef/order-requests"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaClipboardList /> Order Requests
                </Link>
              </>
            )}

            {/* ADMIN MENU */}
            {userRole === "admin" && (
              <>
                <h3 className="font-semibold mt-2">Admin Menu</h3>
                <Link
                  to="/dashboard/admin/my-profile"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineUser /> My Profile
                </Link>
                <Link
                  to="/dashboard/admin/manage-users"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <MdAdminPanelSettings /> Manage Users
                </Link>
                <Link
                  to="/dashboard/admin/manage-requests"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaClipboardList /> Manage Requests
                </Link>
                <Link
                  to="/dashboard/admin/platform-stats"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineStar /> Platform Stats
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Home Button at Bottom */}
        <div className="mt-6">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-2 btn btn-outline w-full justify-center"
          >
            <AiOutlineHome /> Home
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 min-h-screen lg:ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
