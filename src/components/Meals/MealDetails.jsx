import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams(); // meal id
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: "",
    comment: "",
  });

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosPublic.get("/meals?limit=1000");
        const mealsData = res.data.meals || res.data;
        const found = mealsData.find((m) => m._id === id);
        setMeal(found);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMeal();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosPublic.get(`/reviews?foodId=${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  // Handle Add to Favorite
  const handleAddFavorite = async () => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to add favorites", "error");
      return;
    }
    const favoriteData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };
    try {
      const res = await axiosPublic.post("/favorites", favoriteData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Meal added to favorites!", "success");
      } else {
        Swal.fire("Info", "Meal is already in favorites", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add to favorites", "error");
    }
  };

  // Handle Submit Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error", "You must be logged in to submit a review", "error");
      return;
    }
    const reviewData = {
      foodId: id,
      foodName: meal.foodName,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      rating: Number(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString(),
    };
    try {
      const res = await axiosPublic.post("/reviews", reviewData);
      if (res.data.insertedId) {
        setReviews([...reviews, reviewData]);
        setNewReview({ rating: "", comment: "" });
        Swal.fire("Success", "Review submitted successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  // Handle Order Now
  const handleOrderNow = () => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to place an order", "error");
      return;
    }
    navigate(`/order/${meal._id}`); // fix: match router path
  };

  if (!meal) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-start p-6 bg-base-200">
      <div className="w-full max-w-4xl bg-base-100 shadow-lg rounded-lg p-6">
        {/* Meal Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{meal.foodName}</h2>
            <p className="mt-2">
              <strong>Chef:</strong> {meal.chefName} (ID: {meal.chefId})
            </p>
            <p>
              <strong>Price:</strong> ${meal.price}
            </p>
            <p>
              <strong>Rating:</strong> {meal.rating} / 5
            </p>
            <p>
              <strong>Ingredients:</strong> {meal.ingredients}
            </p>
            <p>
              <strong>Delivery Area:</strong> {meal.deliveryArea}
            </p>
            <p>
              <strong>Estimated Delivery Time:</strong> {meal.deliveryTime}
            </p>
            <p>
              <strong>Chef’s Experience:</strong> {meal.chefExperience}
            </p>

            <div className="flex gap-3 mt-4">
              <button className="btn btn-secondary" onClick={handleAddFavorite}>
                Add to Favorite
              </button>
              <button className="btn btn-primary" onClick={handleOrderNow}>
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4 mb-6">
            {reviews.length > 0 ? (
              reviews.map((r, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 flex gap-4 items-start"
                >
                  <img
                    src={r.reviewerImage}
                    alt={r.reviewerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {r.reviewerName} - {r.rating} ⭐
                    </p>
                    <p>{r.comment}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
            <label className="font-semibold">Your Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              className="input input-bordered w-32"
              required
            />

            <label className="font-semibold">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="textarea textarea-bordered"
              rows="3"
              required
            />

            <button type="submit" className="btn btn-primary mt-2 w-40">
              Give Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
