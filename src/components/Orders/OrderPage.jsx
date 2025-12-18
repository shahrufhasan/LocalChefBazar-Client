import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import axiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");

  // Fetch meal info
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosPublic.get("/meals?limit=1000");
        const mealsData = res.data.meals || res.data;
        const foundMeal = mealsData.find((m) => m._id === id);
        setMeal(foundMeal);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMeal();
  }, [id]);

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error", "You must be logged in to place an order", "error");
      return;
    }

    // Check if user is fraud
    try {
      const userRes = await axiosPublic.get(`/users?email=${user.email}`);
      if (userRes.data[0]?.status === "fraud") {
        Swal.fire(
          "Error",
          "Your account has been marked as fraud. You cannot place orders.",
          "error"
        );
        return;
      }
    } catch (err) {
      console.error(err);
    }

    const totalPrice = meal.price * quantity;

    Swal.fire({
      title: `Your total price is $${totalPrice}.`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderData = {
          foodId: meal._id,
          mealName: meal.foodName,
          price: meal.price,
          quantity: quantity,
          chefId: meal.chefId,
          chefName: meal.chefName,
          userEmail: user.email,
          userAddress,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
          paymentStatus: "Pending",
        };

        try {
          const res = await axiosSecure.post("/orders", orderData);
          if (res.data.insertedId) {
            Swal.fire("Success", "Order placed successfully!", "success");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to place order", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Helmet>
        <title>Place Order | LocalChefBazaar</title>
      </Helmet>

      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Confirm Your Order
        </h2>

        <form onSubmit={handleOrder} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Meal Name
            </label>
            <input
              type="text"
              value={meal.foodName}
              readOnly
              className="input w-full bg-gray-100 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Price per Meal ($)
            </label>
            <input
              type="text"
              value={meal.price}
              readOnly
              className="input w-full bg-gray-100 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input w-full bg-white px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Chef ID
            </label>
            <input
              type="text"
              value={meal.chefId}
              readOnly
              className="input w-full bg-gray-100 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input w-full bg-gray-100 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Delivery Address
            </label>
            <textarea
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="textarea w-full bg-white px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              rows="3"
              placeholder="Enter your delivery address..."
              required
            />
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-gray-800">
              Total Price: ${(meal.price * quantity).toFixed(2)}
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4 text-lg">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
