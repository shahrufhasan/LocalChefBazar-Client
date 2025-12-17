import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../hooks/UserInfo";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const { userInfo, isLoading } = UserInfo();
  const axiosSecure = useAxiosSecure();

  const handleRequestRole = async (requestType) => {
    try {
      const requestData = {
        userName: user?.displayName,
        userEmail: user?.email,
        requestType: requestType,
        requestStatus: "pending",
        requestTime: new Date().toISOString(),
      };

      const result = await Swal.fire({
        title: `Request to be ${
          requestType === "chef" ? "a Chef" : "an Admin"
        }?`,
        text: "Your request will be sent to the admin for approval.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send request!",
      });

      if (result.isConfirmed) {
        await axiosSecure.post("/requests", requestData);

        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: `Your ${requestType} request has been sent to the admin.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error sending request:", error);

      if (error.response?.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Already Requested",
          text:
            error.response?.data?.message ||
            "You already have a pending request.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send request. Please try again.",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Profile</h1>

        <div className="bg-base-100 rounded-2xl shadow-xl p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    userInfo?.photoURL ||
                    user?.photoURL ||
                    "/default-avatar.png"
                  }
                  alt={userInfo?.displayName || user?.displayName}
                />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  value={userInfo?.displayName || user?.displayName || "N/A"}
                  className="input input-bordered"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  value={userInfo?.email || user?.email || "N/A"}
                  className="input input-bordered"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <input
                  type="text"
                  value={userInfo?.role || "user"}
                  className="input input-bordered capitalize"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <input
                  type="text"
                  value={userInfo?.status || "active"}
                  className={`input input-bordered capitalize ${
                    userInfo?.status === "fraud" ? "text-error" : "text-success"
                  }`}
                  readOnly
                />
              </div>

              {userInfo?.chefId && (
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Chef ID</span>
                  </label>
                  <input
                    type="text"
                    value={userInfo?.chefId}
                    className="input input-bordered"
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {userInfo?.role !== "chef" && userInfo?.role !== "admin" && (
              <button
                onClick={() => handleRequestRole("chef")}
                className="btn btn-primary"
              >
                Request to be a Chef
              </button>
            )}

            {userInfo?.role !== "admin" && (
              <button
                onClick={() => handleRequestRole("admin")}
                className="btn btn-secondary"
              >
                Request to be an Admin
              </button>
            )}

            {(userInfo?.role === "chef" || userInfo?.role === "admin") && (
              <div className="text-center w-full">
                <p className="text-lg font-semibold text-success">
                  ✓ You are a {userInfo?.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
