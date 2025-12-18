import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axiosPublic from "../../hooks/useAxiosPublic";
import MealCard from "../Meals/MealCard";
import { useNavigate } from "react-router";

const FeaturedMeals = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axiosPublic.get("/meals?page=1&limit=6");
        setMeals(res.data.meals || res.data.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMeals();
  }, []);

  const handleSeeDetails = (mealId) => {
    navigate(`/meal-details/${mealId}`);
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Today's Special Meals</h2>
        <p className="text-gray-500">
          Fresh home-cooked meals from local chefs
        </p>
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

export default FeaturedMeals;
