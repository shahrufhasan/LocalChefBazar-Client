import React from "react";

const MealCard = ({ meal, onSeeDetails }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure>
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{meal.foodName}</h2>

        <div className="flex items-center gap-2">
          <div className="flex text-xl">{renderStars(meal.rating || 0)}</div>
          <span className="text-sm text-gray-600">
            ({meal.rating ? meal.rating.toFixed(1) : "0.0"})
          </span>
        </div>

        <p className="text-lg font-bold text-primary">${meal.price}</p>

        <p className="text-sm text-gray-600">
          <strong>Chef:</strong> {meal.chefName}
        </p>

        <p className="text-sm text-gray-600">
          <strong>Delivery:</strong> {meal.deliveryTime}
        </p>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary btn-outline w-full"
            onClick={() => onSeeDetails(meal._id)}
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
