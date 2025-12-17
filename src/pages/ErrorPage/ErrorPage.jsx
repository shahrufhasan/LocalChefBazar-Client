import React from "react";
import { Link, useRouteError } from "react-router";
import { AiOutlineHome } from "react-icons/ai";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-4xl font-bold mt-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mt-4 text-lg">
          {error?.statusText ||
            error?.message ||
            "The page you're looking for doesn't exist."}
        </p>

        <div className="mt-8">
          <Link to="/" className="btn btn-primary">
            <AiOutlineHome className="text-xl" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
