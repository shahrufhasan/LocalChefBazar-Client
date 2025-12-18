import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });

  const handlePayment = (orderId, totalPrice) => {
    navigate(`/payment/${orderId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "accepted":
        return "badge-info";
      case "delivered":
        return "badge-success";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  const getPaymentColor = (status) => {
    return status === "Paid" ? "badge-success" : "badge-warning";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Helmet>
        <title>My Orders | Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const totalPrice = order.price * order.quantity;
            const canPay =
              order.orderStatus === "accepted" &&
              order.paymentStatus === "Pending";

            return (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 transition-all hover:shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Side */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {order.mealName}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p className="text-gray-600">
                      <strong>Price per Item:</strong> ${order.price}
                    </p>
                    <p className="text-gray-600">
                      <strong>Total:</strong>{" "}
                      <span className="text-xl font-bold text-green-600">
                        ${totalPrice}
                      </span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Chef:</strong> {order.chefName || "N/A"}
                    </p>
                  </div>

                  {/* Right Side */}
                  <div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Order Status</p>
                      <span
                        className={`badge ${getStatusColor(
                          order.orderStatus
                        )} badge-lg`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">
                        Payment Status
                      </p>
                      <span
                        className={`badge ${getPaymentColor(
                          order.paymentStatus
                        )} badge-lg`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      Ordered: {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Payment Button */}
                {canPay && (
                  <div className="mt-4 pt-4 border-t">
                    <button
                      className="btn btn-success w-full md:w-auto"
                      onClick={() => handlePayment(order._id, totalPrice)}
                    >
                      Pay Now (${totalPrice})
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Your order has been accepted! Complete payment to proceed.
                    </p>
                  </div>
                )}

                {/* Status Messages */}
                {order.orderStatus === "pending" && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Waiting for chef to accept your order...
                    </p>
                  </div>
                )}

                {order.orderStatus === "delivered" && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      Order delivered successfully! Enjoy your meal!
                    </p>
                  </div>
                )}

                {order.orderStatus === "cancelled" && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      This order has been cancelled.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No orders yet.</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/meals")}
          >
            Browse Meals
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
