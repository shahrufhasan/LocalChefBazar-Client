import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import MealCard from "./MealCard";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeals();
  }, [currentPage]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/meals?page=${currentPage}&limit=10`);
      setMeals(res.data.meals);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching meals:", err);
    } finally {
      setLoading(false);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-16 py-16">
      <Helmet>
        <title>Meals | LocalChefBazaar</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  className={`btn btn-sm ${
                    currentPage === page ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Show current page info */}
      <div className="text-center mt-4 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Meals;
