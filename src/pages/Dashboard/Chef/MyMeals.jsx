import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";

const MyMeals = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axiosPublic.get("/meals");
        const chefMeals = res.data.filter((m) => m.chefId === user?.uid);
        setMeals(chefMeals);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.uid) fetchMeals();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Name:</strong> {meal.foodName}
              </p>
              <p>
                <strong>Price:</strong> ${meal.price}
              </p>
              <p>
                <strong>Delivery Time:</strong> {meal.deliveryTime}
              </p>
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
