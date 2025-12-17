import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { user } = useAuth();
  const [meal, setMeal] = useState({
    foodName: "",
    price: "",
    ingredients: "",
    deliveryArea: "",
    deliveryTime: "",
    chefExperience: "",
    foodImage: "",
  });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mealData = {
      ...meal,
      chefId: user?.uid,
      chefName: user?.displayName,
      rating: 0,
    };
    try {
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
          foodImage: "",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Meal</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-base-100 p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={meal.foodName}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={meal.price}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={meal.ingredients}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          name="deliveryArea"
          placeholder="Delivery Area"
          value={meal.deliveryArea}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          name="deliveryTime"
          placeholder="Estimated Delivery Time"
          value={meal.deliveryTime}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          name="chefExperience"
          placeholder="Chef Experience"
          value={meal.chefExperience}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          name="foodImage"
          placeholder="Image URL"
          value={meal.foodImage}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <button type="submit" className="btn btn-primary mt-2">
          Create Meal
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
