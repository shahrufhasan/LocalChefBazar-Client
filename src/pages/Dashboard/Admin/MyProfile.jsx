import React from "react";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="bg-base-100 p-4 rounded-lg shadow-md">
        <p>
          <strong>Name:</strong> {user?.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-32 h-32 rounded-full mt-4"
        />
      </div>
    </div>
  );
};

export default MyProfile;
