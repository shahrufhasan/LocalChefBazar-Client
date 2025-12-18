import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const OrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chef-orders", user?.email],
    queryFn: async () => {
      const userRes = await axiosSecure.get(`/users?email=${user.email}`);
      const currentChef = userRes.data[0];

      if (!currentChef?.chefId) {
        return [];
      }

      const res = await axiosSecure.get("/orders");
      const chefOrders = res.data.filter(
        (o) => o.chefId === currentChef.chefId
      );
      return chefOrders;
    },
    enabled: !!user?.email,
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const statusMessages = {
      accepted: "Accept this order?",
      cancelled: "Cancel this order?",
      delivered: "Mark this order as delivered?",
    };

    Swal.fire({
      title: "Are you sure?",
      text: statusMessages[newStatus],
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "cancelled" ? "#ef4444" : "#10b981",
      confirmButtonText: "Yes, proceed!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/${id}`, {
            orderStatus: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", `Order ${newStatus} successfully`, "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update order status", "error");
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
        <title>Order Requests | Chef Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">Order Requests</h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const totalPrice = order.price * order.quantity;
            const canAccept = order.orderStatus === "pending";
            const canDeliver =
              order.orderStatus === "accepted" &&
              order.paymentStatus === "Paid";

            return (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-orange-500 transition-all hover:shadow-xl"
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
                      <strong>Price:</strong> ${order.price} × {order.quantity}{" "}
                      ={" "}
                      <span className="font-bold text-green-600">
                        ${totalPrice}
                      </span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Customer:</strong> {order.userEmail}
                    </p>
                    <p className="text-gray-600">
                      <strong>Address:</strong> {order.userAddress}
                    </p>
                  </div>

                  {/* Right Side */}
                  <div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Order Status</p>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">
                        Payment Status
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      Ordered: {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t flex gap-2 flex-wrap">
                  {canAccept && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          handleStatusUpdate(order._id, "accepted")
                        }
                      >
                        Accept Order
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() =>
                          handleStatusUpdate(order._id, "cancelled")
                        }
                      >
                        Cancel Order
                      </button>
                    </>
                  )}

                  {order.orderStatus === "accepted" &&
                    order.paymentStatus === "Pending" && (
                      <div className="w-full p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          Waiting for customer payment...
                        </p>
                      </div>
                    )}

                  {canDeliver && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleStatusUpdate(order._id, "delivered")}
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {order.orderStatus === "delivered" && (
                    <div className="w-full p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        Order delivered successfully!
                      </p>
                    </div>
                  )}

                  {order.orderStatus === "cancelled" && (
                    <div className="w-full p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700">
                        This order has been cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
