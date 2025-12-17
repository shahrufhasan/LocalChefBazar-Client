import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utilities";

const MyMeals = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, [user]);

  const fetchMeals = async () => {
    try {
      const userRes = await axiosPublic.get(`/users?email=${user.email}`);
      const currentChef = userRes.data[0];

      if (!currentChef?.chefId) {
        console.log("No chefId found for this user");
        return;
      }

      const res = await axiosPublic.get("/meals?limit=1000");
      const mealsData = res.data.meals || res.data;

      const chefMeals = mealsData.filter(
        (m) => m.chefId === currentChef.chefId
      );
      setMeals(chefMeals);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this meal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/meals/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Meal has been deleted.", "success");
            fetchMeals();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete meal", "error");
        }
      }
    });
  };

  const handleUpdateClick = (meal) => {
    setEditingMeal(meal._id);
    setUpdateData({ ...meal });
    setImageFile(null);
  };

  const handleUpdateSubmit = async (id) => {
    try {
      setUploading(true);

      let finalData = { ...updateData };

      // If user selected a new image, upload it
      if (imageFile) {
        const imageURL = await imageUpload(imageFile);
        finalData.foodImage = imageURL;
      }

      const res = await axiosPublic.patch(`/meals/${id}`, finalData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Meal has been updated.", "success");
        setEditingMeal(null);
        setImageFile(null);
        fetchMeals();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update meal", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal._id} className="p-4 bg-base-100 shadow rounded-lg">
              {editingMeal === meal._id ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Food Name
                    </label>
                    <input
                      type="text"
                      name="foodName"
                      value={updateData.foodName}
                      onChange={handleChange}
                      placeholder="Food Name"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={updateData.price}
                      onChange={handleChange}
                      placeholder="Price"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ingredients
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      value={updateData.ingredients}
                      onChange={handleChange}
                      placeholder="Ingredients"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Delivery Area
                    </label>
                    <input
                      type="text"
                      name="deliveryArea"
                      value={updateData.deliveryArea}
                      onChange={handleChange}
                      placeholder="Delivery Area"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Delivery Time
                    </label>
                    <input
                      type="text"
                      name="deliveryTime"
                      value={updateData.deliveryTime}
                      onChange={handleChange}
                      placeholder="Delivery Time"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Chef Experience
                    </label>
                    <input
                      type="text"
                      name="chefExperience"
                      value={updateData.chefExperience}
                      onChange={handleChange}
                      placeholder="Chef Experience"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Update Food Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input file-input-bordered w-full"
                    />
                    {imageFile && (
                      <p className="text-xs text-green-600 mt-1">
                        New image selected: {imageFile.name}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateSubmit(meal._id)}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Save"}
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setEditingMeal(null);
                        setImageFile(null);
                      }}
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <p>
                    <strong>Name:</strong> {meal.foodName}
                  </p>
                  <p>
                    <strong>Price:</strong> ${meal.price}
                  </p>
                  <p>
                    <strong>Rating:</strong> {meal.rating}
                  </p>
                  <p>
                    <strong>Ingredients:</strong> {meal.ingredients}
                  </p>
                  <p>
                    <strong>Delivery Time:</strong> {meal.deliveryTime}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleUpdateClick(meal)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(meal._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No meals created yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyMeals;
