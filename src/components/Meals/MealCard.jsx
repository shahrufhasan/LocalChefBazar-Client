import React from "react";

const MealCard = ({ meal, onSeeDetails }) => {
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
        <p className="text-sm text-gray-600">
          Chef: {meal.chefName} ({meal.chefId})
        </p>
        <p className="text-sm text-gray-600">Rating: {meal.rating}</p>
        <p className="text-sm text-gray-600">
          Delivery Area: {meal.deliveryArea}
        </p>
        <p className="font-bold text-lg mt-2">
          ${Number(meal.price).toFixed(2)}
        </p>

        <div className="card-actions mt-2">
          <button
            className="btn btn-primary btn-block"
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
