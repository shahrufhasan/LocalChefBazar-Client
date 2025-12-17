import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";

const OrderRequests = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosPublic.get("/orders");
        const chefOrders = res.data.filter((o) => o.chefId === user?.uid);
        setOrders(chefOrders);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.uid) fetchOrders();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Meal:</strong> {order.mealName}
              </p>
              <p>
                <strong>User Email:</strong> {order.userEmail}
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

export default OrderRequests;
