import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const MyReview = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [updateData, setUpdateData] = useState({ rating: "", comment: "" });

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    try {
      if (!user?.email) return;
      const res = await axiosPublic.get(`/reviews?reviewerEmail=${user.email}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/reviews/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Review has been deleted.", "success");
            fetchReviews();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete review", "error");
        }
      }
    });
  };

  const handleUpdateClick = (review) => {
    setEditingReview(review._id);
    setUpdateData({ rating: review.rating, comment: review.comment });
  };

  const handleUpdateSubmit = async (id) => {
    try {
      const res = await axiosPublic.patch(`/reviews/${id}`, updateData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Review has been updated.", "success");
        setEditingReview(null);
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="p-4 bg-base-100 shadow rounded-lg">
              {editingReview === r._id ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="font-semibold">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={updateData.rating}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, rating: e.target.value })
                      }
                      className="input input-bordered w-32 ml-2"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Comment</label>
                    <textarea
                      value={updateData.comment}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          comment: e.target.value,
                        })
                      }
                      className="textarea textarea-bordered w-full mt-2"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateSubmit(r._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setEditingReview(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <p>
                    <strong>Meal:</strong> {r.foodName || "Unknown"}
                  </p>
                  <p>
                    <strong>Rating:</strong> {r.rating} ⭐
                  </p>
                  <p>
                    <strong>Comment:</strong> {r.comment}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(r.date).toLocaleString()}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleUpdateClick(r)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
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
