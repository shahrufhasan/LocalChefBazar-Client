import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";

const MyReview = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosPublic.get(
          `/reviews?reviewerEmail=${user.email}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) fetchReviews();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Meal:</strong> {r.foodName}
              </p>
              <p>
                <strong>Rating:</strong> {r.rating}
              </p>
              <p>
                <strong>Comment:</strong> {r.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyReview;
