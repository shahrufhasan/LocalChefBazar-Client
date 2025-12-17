import React, { useEffect, useState } from "react";
import axiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageRequests = () => {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [requests, setRequests] = useState([]);

  // fetch logged-in user from DB
  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user]);

  // fetch requests
  useEffect(() => {
    axiosPublic.get("/requests").then((res) => {
      setRequests(res.data);
    });
  }, []);

  // approve / reject
  const handleUpdateStatus = async (request, status) => {
    try {
      await axiosPublic.patch(`/requests/${request._id}`, {
        requestStatus: status,
      });

      if (status === "approved") {
        await axiosPublic.patch(`/users/${request.userEmail}/role`, {
          role: request.requestType,
          status: "active",
          chefId: request.requestType === "chef" ? `CHEF-${Date.now()}` : null,
        });
      }

      Swal.fire("Success", `Request ${status}`, "success");

      setRequests((prev) =>
        prev.map((r) =>
          r._id === request._id ? { ...r, requestStatus: status } : r
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Action failed", "error");
    }
  };

  // ❌ Block non-admin users
  if (!dbUser || dbUser.role !== "admin") {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Access denied. Admins only.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div
              key={r._id}
              className="p-4 bg-base-100 shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>User:</strong> {r.userName}
                </p>
                <p>
                  <strong>Email:</strong> {r.userEmail}
                </p>
                <p>
                  <strong>Type:</strong> {r.requestType}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{r.requestStatus}</span>
                </p>
              </div>

              {r.requestStatus === "pending" && (
                <div className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUpdateStatus(r, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleUpdateStatus(r, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
