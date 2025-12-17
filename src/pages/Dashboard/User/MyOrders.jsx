import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get(`/orders?userEmail=${user.email}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async (orderId, totalPrice) => {
    Swal.fire({
      title: "Payment Confirmation",
      text: `Total Amount: $${totalPrice}. Proceed to payment?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Pay Now",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Update payment status to "Paid"
          const res = await axiosPublic.patch(`/orders/${orderId}/payment`, {
            paymentStatus: "Paid",
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "Your payment has been processed successfully.",
              confirmButtonText: "OK",
            });
            fetchOrders(); // Refresh orders
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Payment failed. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => {
            const totalPrice = order.price * order.quantity;
            const showPayButton =
              order.orderStatus === "accepted" &&
              order.paymentStatus === "Pending";

            return (
              <div
                key={order._id}
                className="p-4 bg-base-100 shadow rounded-lg border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Meal:</strong> {order.mealName}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Price per Item:</strong> ${order.price}
                    </p>
                    <p>
                      <strong>Total Price:</strong> ${totalPrice}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Order Status:</strong>{" "}
                      <span
                        className={`font-semibold ${
                          order.orderStatus === "pending"
                            ? "text-yellow-600"
                            : order.orderStatus === "accepted"
                            ? "text-blue-600"
                            : order.orderStatus === "delivered"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      <span
                        className={`font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Chef Name:</strong> {order.chefName || "N/A"}
                    </p>
                    <p>
                      <strong>Order Time:</strong>{" "}
                      {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                {showPayButton && (
                  <div className="mt-4">
                    <button
                      className="btn btn-success"
                      onClick={() => handlePayment(order._id, totalPrice)}
                    >
                      Pay Now (${totalPrice})
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
