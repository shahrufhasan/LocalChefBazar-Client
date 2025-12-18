import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import MealCard from "./MealCard";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeals();
  }, [currentPage]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/meals?page=${currentPage}&limit=10`);
      setMeals(res.data.meals);
      setAllMeals(res.data.meals);
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterMeals(term, ratingFilter);
  };

  const filterMeals = (search, rating) => {
    let filtered = [...allMeals];

    if (search) {
      filtered = filtered.filter((meal) =>
        meal.foodName.toLowerCase().includes(search)
      );
    }

    if (rating !== "all") {
      const minRating = parseFloat(rating);
      filtered = filtered.filter((meal) => meal.rating >= minRating);
    }

    setMeals(filtered);
  };

  const handleSeeDetails = (mealId) => {
    navigate(`/meal-details/${mealId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchTerm("");
    setRatingFilter("all");
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

      {/* Header Section */}
      <div className="text-center space-y-3 mb-12">
        <h1 className="text-6xl font-bold">Explore Our Daily Meals</h1>
        <p className="text-gray-500 text-2xl">
          Fresh, homemade dishes crafted by local chefs just for you
        </p>
      </div>

      {/* Search and Filter  */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={handleSearch}
            className="input input-bordered w-full"
          />
        </div>

        {/* Sort by Price */}
        <button
          onClick={handleSort}
          className="btn btn-outline w-full text-gray-500 md:w-auto"
        >
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      {/* Meals Grid */}
      {meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard
              key={meal._id}
              meal={meal}
              onSeeDetails={handleSeeDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No meals found matching your criteria.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              setSearchTerm("");
              setRatingFilter("all");
              setMeals(allMeals);
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination  */}
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

      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {meals.length} meals - Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Meals;
