// src/layout/DashboardLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router";
import {
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { FaUtensils, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64 bg-base-100 shadow-lg p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">User</h3>
            <Link
              to="/dashboard/user/my-profile"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineUser /> My Profile
            </Link>
            <Link
              to="/dashboard/user/my-orders"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineFileText /> My Orders
            </Link>
            <Link
              to="/dashboard/user/my-reviews"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineStar /> My Reviews
            </Link>
            <Link
              to="/dashboard/user/favorite-meal"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineHeart /> Favorite Meals
            </Link>

            <h3 className="font-semibold mt-4">Chef</h3>
            <Link
              to="/dashboard/chef/my-profile"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineUser /> My Profile
            </Link>
            <Link
              to="/dashboard/chef/create-meal"
              className="flex items-center gap-2 hover:text-primary"
            >
              <FaUtensils /> Create Meal
            </Link>
            <Link
              to="/dashboard/chef/my-meals"
              className="flex items-center gap-2 hover:text-primary"
            >
              <FaBoxOpen /> My Meals
            </Link>
            <Link
              to="/dashboard/chef/order-requests"
              className="flex items-center gap-2 hover:text-primary"
            >
              <FaClipboardList /> Order Requests
            </Link>

            <h3 className="font-semibold mt-4">Admin</h3>
            <Link
              to="/dashboard/admin/my-profile"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineUser /> My Profile
            </Link>
            <Link
              to="/dashboard/admin/manage-users"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MdAdminPanelSettings /> Manage Users
            </Link>
            <Link
              to="/dashboard/admin/manage-requests"
              className="flex items-center gap-2 hover:text-primary"
            >
              <FaClipboardList /> Manage Requests
            </Link>
            <Link
              to="/dashboard/admin/platform-stats"
              className="flex items-center gap-2 hover:text-primary"
            >
              <AiOutlineStar /> Platform Stats
            </Link>
          </div>
        </div>

        {/* Home Button at Bottom */}
        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center gap-2 btn btn-outline w-full justify-center"
          >
            <AiOutlineHome /> Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
