// src/layout/DashboardLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64 bg-base-100 shadow-lg p-4 flex flex-col gap-3">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">User</h3>
          <Link to="/dashboard/user/my-profile" className="link">
            My Profile
          </Link>
          <Link to="/dashboard/user/my-orders" className="link">
            My Orders
          </Link>
          <Link to="/dashboard/user/my-reviews" className="link">
            My Reviews
          </Link>
          <Link to="/dashboard/user/favorite-meals" className="link">
            Favorite Meals
          </Link>

          <h3 className="font-semibold mt-4">Chef</h3>
          <Link to="/dashboard/chef/my-profile" className="link">
            My Profile
          </Link>
          <Link to="/dashboard/chef/create-meal" className="link">
            Create Meal
          </Link>
          <Link to="/dashboard/chef/my-meals" className="link">
            My Meals
          </Link>
          <Link to="/dashboard/chef/order-requests" className="link">
            Order Requests
          </Link>

          <h3 className="font-semibold mt-4">Admin</h3>
          <Link to="/dashboard/admin/my-profile" className="link">
            My Profile
          </Link>
          <Link to="/dashboard/admin/manage-users" className="link">
            Manage Users
          </Link>
          <Link to="/dashboard/admin/manage-requests" className="link">
            Manage Requests
          </Link>
          <Link to="/dashboard/admin/platform-stats" className="link">
            Platform Stats
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
