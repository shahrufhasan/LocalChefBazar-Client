import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const OrderRequests = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get("/orders");
      const chefOrders = res.data.filter((o) => o.chefId === user?.uid);
      setOrders(chefOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosPublic.patch(`/orders/${id}`, {
        orderStatus: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Updated!",
          `Order status changed to ${newStatus}`,
          "success"
        );
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
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
                    <strong>Price:</strong> ${order.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.price * order.quantity}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>User Email:</strong> {order.userEmail}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.userAddress}
                  </p>
                  <p>
                    <strong>Order Time:</strong>{" "}
                    {new Date(order.orderTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    <span
                      className={
                        order.paymentStatus === "Paid"
                          ? "text-green-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p>
                  <strong>Status:</strong>{" "}
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
              </div>

              <div className="flex gap-2 mt-4">
                {/* Cancel Button */}
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleStatusUpdate(order._id, "cancelled")}
                  disabled={order.orderStatus !== "pending"}
                >
                  Cancel
                </button>

                {/* Accept Button */}
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleStatusUpdate(order._id, "accepted")}
                  disabled={order.orderStatus !== "pending"}
                >
                  Accept
                </button>

                {/* Deliver Button */}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleStatusUpdate(order._id, "delivered")}
                  disabled={order.orderStatus !== "accepted"}
                >
                  Deliver
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No order requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrderRequests;
