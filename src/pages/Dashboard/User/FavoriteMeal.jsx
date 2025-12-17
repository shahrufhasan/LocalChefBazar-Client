import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";

const FavoriteMeal = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosPublic.get(`/favorites?userEmail=${user.email}`);
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) fetchFavorites();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Favorite Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.length > 0 ? (
          favorites.map((f) => (
            <div key={f._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Meal:</strong> {f.mealName}
              </p>
              <p>
                <strong>Chef:</strong> {f.chefName}
              </p>
              <p>
                <strong>Price:</strong> ${f.price}
              </p>
            </div>
          ))
        ) : (
          <p>No favorite meals yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteMeal;
