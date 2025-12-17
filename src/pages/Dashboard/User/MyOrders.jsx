import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosPublic.get(`/orders?userEmail=${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) fetchOrders();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="p-4 bg-base-100 shadow rounded-lg">
              <p>
                <strong>Meal:</strong> {order.mealName}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> ${order.price * order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
            </div>
          ))
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
