import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");

  // Fetch meal info
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosPublic.get("/meals");
        const foundMeal = res.data.find((m) => m._id === id);
        setMeal(foundMeal);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMeal();
  }, [id]);

  if (!meal) return <div className="text-center mt-10">Loading...</div>;

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error", "You must be logged in to place an order", "error");
      return;
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
          userEmail: user.email,
          userAddress,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
          paymentStatus: "Pending",
        };

        try {
          const res = await axiosPublic.post("/orders", orderData);
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
    <div className="min-h-screen flex justify-center items-start p-6 bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Confirm Your Order
        </h2>

        <form onSubmit={handleOrder} className="flex flex-col gap-4">
          <label>Meal Name</label>
          <input
            type="text"
            value={meal.foodName}
            readOnly
            className="input input-bordered"
          />

          <label>Price per Meal ($)</label>
          <input
            type="text"
            value={meal.price}
            readOnly
            className="input input-bordered"
          />

          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input input-bordered"
            required
          />

          <label>Chef ID</label>
          <input
            type="text"
            value={meal.chefId}
            readOnly
            className="input input-bordered"
          />

          <label>User Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered"
          />

          <label>Delivery Address</label>
          <textarea
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="textarea textarea-bordered"
            required
          />

          <button type="submit" className="btn btn-primary mt-4">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
