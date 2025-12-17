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
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../hooks/useAxiosPublic";

const DashboardLayout = () => {
  const { user } = useAuth();

  // Fetch user role from database
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

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64 bg-base-100 shadow-lg p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

          <div className="flex flex-col gap-2">
            {/* USER MENU */}
            {userRole === "user" && (
              <>
                <h3 className="font-semibold mt-2">User Menu</h3>
                <Link
                  to="/dashboard/user/my-profile"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineUser /> My Profile
                </Link>
                <Link
                  to="/dashboard/user/my-orders"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineFileText /> My Orders
                </Link>
                <Link
                  to="/dashboard/user/my-reviews"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineStar /> My Reviews
                </Link>
                <Link
                  to="/dashboard/user/favorite-meal"
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
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineUser /> My Profile
                </Link>
                <Link
                  to="/dashboard/chef/create-meal"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaUtensils /> Create Meal
                </Link>
                <Link
                  to="/dashboard/chef/my-meals"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaBoxOpen /> My Meals
                </Link>
                <Link
                  to="/dashboard/chef/order-requests"
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
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <AiOutlineUser /> My Profile
                </Link>
                <Link
                  to="/dashboard/admin/manage-users"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <MdAdminPanelSettings /> Manage Users
                </Link>
                <Link
                  to="/dashboard/admin/manage-requests"
                  className="flex items-center gap-2 hover:text-primary p-2 rounded hover:bg-base-200"
                >
                  <FaClipboardList /> Manage Requests
                </Link>
                <Link
                  to="/dashboard/admin/platform-stats"
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
            className="flex items-center gap-2 btn btn-outline w-full justify-center"
          >
            <AiOutlineHome /> Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
