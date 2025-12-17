import React, { useEffect, useState } from "react";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosPublic.get("/requests");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axiosPublic.patch(`/requests/${id}`, { requestStatus: status });
      Swal.fire(
        "Success",
        `Request has been ${status === "approved" ? "approved" : "rejected"}!`,
        "success"
      );
      // Refetch requests
      const res = await axiosPublic.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update request status", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage User Requests</h2>

      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div
              key={r._id}
              className="p-4 bg-base-100 shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>User:</strong> {r.userName} ({r.userEmail})
                </p>
                <p>
                  <strong>Request Type:</strong> {r.requestType}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      r.requestStatus === "pending"
                        ? "text-yellow-500"
                        : r.requestStatus === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {r.requestStatus}
                  </span>
                </p>
                <p>
                  <strong>Requested At:</strong>{" "}
                  {new Date(r.requestTime).toLocaleString()}
                </p>
              </div>

              {r.requestStatus === "pending" && (
                <div className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
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
                    className="btn btn-error btn-sm"
                    onClick={() => handleUpdateStatus(r._id, "rejected")}
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
