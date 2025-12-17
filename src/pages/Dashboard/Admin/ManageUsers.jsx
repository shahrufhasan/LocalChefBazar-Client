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

  const handleRoleUpdate = async (email, role) => {
    try {
      await axiosPublic.patch(`/users/${email}/role`, {
        role,
        status: "active",
      });

      Swal.fire("Success", `User promoted to ${role}`, "success");
      refetch(); // 🔥 instantly refresh UI
    } catch (error) {
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users (Admin)</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>

                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => handleRoleUpdate(user.email, "admin")}
                    >
                      Make Admin
                    </button>
                  )}

                  {user.role !== "chef" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handleRoleUpdate(user.email, "chef")}
                    >
                      Make Chef
                    </button>
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
