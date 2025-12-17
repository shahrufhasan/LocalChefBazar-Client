import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../hooks/useAxiosPublic";

const ManageUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading users...</p>;

  const handleMakeFraud = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to mark this user as fraud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, mark as fraud!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.patch(`/users/${email}/status`, {
            status: "fraud",
          });

          Swal.fire("Success", "User marked as fraud", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error", "Failed to update user status", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || user.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "fraud" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td>
                  {user.role !== "admin" && user.status !== "fraud" && (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleMakeFraud(user.email)}
                    >
                      Make Fraud
                    </button>
                  )}

                  {user.status === "fraud" && (
                    <span className="text-xs text-gray-500">
                      Marked as Fraud
                    </span>
                  )}

                  {user.role === "admin" && (
                    <span className="text-xs text-gray-500">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
