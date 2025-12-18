import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ProfileCard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user info from DB
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        if (res.data && res.data.length > 0) {
          setCurrentUser(res.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [user, axiosSecure]);

  if (!currentUser) return <div>Loading...</div>;

  const sendRequest = async (type) => {
    const requestData = {
      userName: currentUser.name || user.displayName,
      userEmail: currentUser.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);
      if (res.data.insertedId) {
        Swal.fire(
          "Success",
          `Your request to become ${type} has been sent!`,
          "success"
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send request", "error");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-base-100 shadow rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-xl font-bold">
          {currentUser.name || user.displayName}
        </h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {currentUser.address}
        </p>
        <p>
          <strong>Role:</strong> {currentUser.role || "user"}
        </p>
        <p>
          <strong>Status:</strong> {currentUser.status || "active"}
        </p>
        {currentUser.role === "chef" && (
          <p>
            <strong>Chef ID:</strong> {currentUser.chefId}
          </p>
        )}

        <div className="flex gap-2 mt-4">
          {currentUser.role !== "chef" && currentUser.role !== "admin" && (
            <button
              className="btn btn-primary"
              onClick={() => sendRequest("chef")}
            >
              Be a Chef
            </button>
          )}
          {currentUser.role !== "admin" && (
            <button
              className="btn btn-secondary"
              onClick={() => sendRequest("admin")}
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
