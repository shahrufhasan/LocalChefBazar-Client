import React from "react";
import { Outlet, Link } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-lg rounded-r-xl p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>

        {/* User Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">User</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/dashboard/user/my-profile"
                className="btn btn-ghost btn-block justify-start"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/user/my-orders"
                className="btn btn-ghost btn-block justify-start"
              >
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/user/my-reviews"
                className="btn btn-ghost btn-block justify-start"
              >
                My Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/user/favorite-meal"
                className="btn btn-ghost btn-block justify-start"
              >
                Favorite Meals
              </Link>
            </li>
          </ul>
        </div>

        {/* Chef Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Chef</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/dashboard/chef/my-profile"
                className="btn btn-ghost btn-block justify-start"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/chef/create-meal"
                className="btn btn-ghost btn-block justify-start"
              >
                Create Meal
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/chef/my-meals"
                className="btn btn-ghost btn-block justify-start"
              >
                My Meals
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/chef/order-requests"
                className="btn btn-ghost btn-block justify-start"
              >
                Order Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Admin</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/dashboard/admin/my-profile"
                className="btn btn-ghost btn-block justify-start"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/admin/manage-users"
                className="btn btn-ghost btn-block justify-start"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/admin/manage-requests"
                className="btn btn-ghost btn-block justify-start"
              >
                Manage Requests
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/admin/platform-stats"
                className="btn btn-ghost btn-block justify-start"
              >
                Platform Stats
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
