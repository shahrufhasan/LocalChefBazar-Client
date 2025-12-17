import React, { useState, useEffect } from "react";
import axios from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import MealCard from "./MealCard";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("/meals");
      setMeals(res.data);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  const handleSort = () => {
    const sorted = [...meals].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setMeals(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSeeDetails = (mealId) => {
    navigate(`/meal-details/${mealId}`);
  };

  return (
    <div className="h-screen my-16 py-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Daily Meals</h1>
        <button onClick={handleSort} className="btn btn-secondary">
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <MealCard
            key={meal._id}
            meal={meal}
            onSeeDetails={handleSeeDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Meals;
