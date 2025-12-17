import React, { useEffect, useState } from "react";
import axiosPublic from "../../../hooks/useAxiosPublic";

const ManageRequests = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosPublic.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Order Requests</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Meal:</strong> {order.mealName}
              </p>
              <p>
                <strong>User:</strong> {order.userEmail}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
            </div>
          ))
        ) : (
          <p>No order requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
