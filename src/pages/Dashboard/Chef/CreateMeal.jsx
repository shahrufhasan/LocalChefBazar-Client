import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utilities";

const CreateMeal = () => {
  const { user } = useAuth();
  const [meal, setMeal] = useState({
    foodName: "",
    price: "",
    ingredients: "",
    deliveryArea: "",
    deliveryTime: "",
    chefExperience: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRes = await axiosPublic.get(`/users?email=${user.email}`);
      if (userRes.data[0]?.status === "fraud") {
        Swal.fire(
          "Error",
          "Your account has been marked as fraud. You cannot create meals.",
          "error"
        );
        return;
      }
    } catch (err) {
      console.error(err);
    }

    if (!imageFile) {
      Swal.fire("Error", "Please select an image", "error");
      return;
    }

    try {
      setUploading(true);

      // Upload image to ImgBB
      const imageURL = await imageUpload(imageFile);

      const mealData = {
        ...meal,
        foodImage: imageURL,
        chefId: user?.uid,
        chefName: user?.displayName,
        rating: 0,
      };

      const res = await axiosPublic.post("/meals", mealData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Meal created successfully!", "success");
        setMeal({
          foodName: "",
          price: "",
          ingredients: "",
          deliveryArea: "",
          deliveryTime: "",
          chefExperience: "",
        });
        setImageFile(null);
        // Reset file input
        document.getElementById("imageInput").value = "";
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Meal</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-base-100 p-6 rounded-lg shadow-md max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Food Name</label>
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            value={meal.foodName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={meal.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (e.g., Rice, Chicken, Spices)"
            value={meal.ingredients}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Delivery Area
          </label>
          <input
            type="text"
            name="deliveryArea"
            placeholder="Delivery Area"
            value={meal.deliveryArea}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Estimated Delivery Time
          </label>
          <input
            type="text"
            name="deliveryTime"
            placeholder="e.g., 30-45 minutes"
            value={meal.deliveryTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Chef Experience
          </label>
          <input
            type="text"
            name="chefExperience"
            placeholder="Chef Experience"
            value={meal.chefExperience}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Food Image</label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />
          {imageFile && (
            <p className="text-xs text-green-600 mt-1">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={uploading}
        >
          {uploading ? "Creating..." : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
