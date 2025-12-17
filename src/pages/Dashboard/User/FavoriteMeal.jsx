import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const FavoriteMeal = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const res = await axiosPublic.get(`/favorites?userEmail=${user.email}`);
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this meal from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/favorites/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Meal removed from favorites.", "success");
            // Refresh the list
            fetchFavorites();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete favorite", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Favorite Meals</h2>

      {favorites.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal Name</th>
                <th>Chef Name</th>
                <th>Price</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav, index) => (
                <tr key={fav._id}>
                  <td>{index + 1}</td>
                  <td>{fav.mealName}</td>
                  <td>{fav.chefName}</td>
                  <td>${fav.price}</td>
                  <td>{new Date(fav.addedTime).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(fav._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No favorite meals yet.</p>
      )}
    </div>
  );
};

export default FavoriteMeal;
