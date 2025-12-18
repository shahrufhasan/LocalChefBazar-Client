import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch requests", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, userEmail, requestType) => {
    const actionText = status === "approved" ? "approve" : "reject";

    Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${actionText} this ${requestType} request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ✅ Use axiosSecure for PATCH request
          const res = await axiosSecure.patch(`/requests/${id}`, {
            requestStatus: status,
          });

          if (res.data.modifiedCount > 0 || res.data.message) {
            Swal.fire(
              "Success!",
              `Request has been ${
                status === "approved" ? "approved" : "rejected"
              }${
                status === "approved" && requestType === "chef"
                  ? " and Chef ID has been generated"
                  : ""
              }!`,
              "success"
            );
            fetchRequests(); // Refresh the list
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update request status", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Helmet>
        <title>Manage Requests | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">Manage User Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No requests available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Request Type</th>
                <th>Status</th>
                <th>Requested At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, index) => (
                <tr key={r._id}>
                  <td>{index + 1}</td>
                  <td>{r.userName}</td>
                  <td>{r.userEmail}</td>
                  <td>
                    <span className="badge badge-info capitalize">
                      {r.requestType}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        r.requestStatus === "pending"
                          ? "badge-warning"
                          : r.requestStatus === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {r.requestStatus}
                    </span>
                  </td>
                  <td className="text-sm">
                    {new Date(r.requestTime).toLocaleString()}
                  </td>
                  <td>
                    {r.requestStatus === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-xs"
                          onClick={() =>
                            handleUpdateStatus(
                              r._id,
                              "approved",
                              r.userEmail,
                              r.requestType
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() =>
                            handleUpdateStatus(
                              r._id,
                              "rejected",
                              r.userEmail,
                              r.requestType
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500 capitalize">
                        {r.requestStatus}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
