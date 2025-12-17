import React, { useEffect, useState } from "react";
import axiosPublic from "../../../hooks/useAxiosPublic";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosPublic.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Name:</strong> {user.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Status:</strong> {user.status || "active"}
              </p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
