import React, { useEffect, useState } from "react";
import axiosPublic from "../../hooks/useAxiosPublic";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosPublic.get("/reviews");
        // Get latest 6 reviews
        setReviews(res.data.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-500 mt-2">Real reviews from real people</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{review.reviewerName}</h3>
                    <div className="text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No reviews yet. Be the first to leave a review!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
