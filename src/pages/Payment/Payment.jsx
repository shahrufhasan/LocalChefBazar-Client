import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import axiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderAndCreateIntent();
  }, [orderId]);

  const fetchOrderAndCreateIntent = async () => {
    try {
      // Fetch order details
      const ordersRes = await axiosPublic.get("/orders");
      const foundOrder = ordersRes.data.find((o) => o._id === orderId);

      if (!foundOrder) {
        Swal.fire("Error", "Order not found", "error");
        navigate("/dashboard/user/my-orders");
        return;
      }

      setOrder(foundOrder);

      const totalAmount = foundOrder.price * foundOrder.quantity;

      // Create payment intent
      const paymentRes = await axiosPublic.post("/create-payment-intent", {
        amount: totalAmount,
      });

      setClientSecret(paymentRes.data.clientSecret);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to initialize payment", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      const totalAmount = order.price * order.quantity;

      // Save payment history
      const paymentData = {
        orderId: order._id,
        userEmail: user.email,
        amount: totalAmount,
        transactionId: paymentIntent.id,
        paymentStatus: "Paid",
        paymentTime: new Date().toISOString(),
      };

      await axiosPublic.post("/payment-history", paymentData);

      // Update order payment status
      await axiosPublic.patch(`/orders/${order._id}/payment`, {
        paymentStatus: "Paid",
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `Transaction ID: ${paymentIntent.id}`,
      }).then(() => {
        navigate("/payment-success", { state: { paymentIntent, order } });
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save payment", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const totalAmount = order.price * order.quantity;

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <Helmet>
        <title>Payment | LocalChefBazaar</title>
      </Helmet>

      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Complete Payment
        </h2>

        <div className="mb-6 p-4 bg-base-200 rounded-lg">
          <p>
            <strong>Meal:</strong> {order.mealName}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>Total Amount:</strong> ${totalAmount}
          </p>
        </div>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm
              orderId={orderId}
              amount={totalAmount}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
