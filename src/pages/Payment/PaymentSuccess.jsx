import React from "react";
import { Link, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentIntent, order } = location.state || {};

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <Helmet>
        <title>Payment Success | LocalChefBazaar</title>
      </Helmet>

      <div className="text-center bg-base-100 shadow-lg rounded-lg p-8 max-w-md">
        <AiOutlineCheckCircle className="text-8xl text-success mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your order. Your payment has been processed
          successfully.
        </p>

        {paymentIntent && (
          <div className="bg-base-200 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm">
              <strong>Transaction ID:</strong>{" "}
              <span className="text-xs break-all">{paymentIntent.id}</span>
            </p>
            {order && (
              <>
                <p className="text-sm mt-2">
                  <strong>Order:</strong> {order.mealName}
                </p>
                <p className="text-sm">
                  <strong>Amount Paid:</strong> ${order.price * order.quantity}
                </p>
              </>
            )}
          </div>
        )}

        <div className="flex gap-2 justify-center">
          <Link to="/dashboard/user/my-orders" className="btn btn-primary">
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
