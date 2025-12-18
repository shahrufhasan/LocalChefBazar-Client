import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { ImSpinner3 } from "react-icons/im";
import Swal from "sweetalert2";

const Login = () => {
  const { singInUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const result = await singInUser(email, password);

      // ✅ Get Firebase ID Token immediately after login
      const token = await result.user.getIdToken();
      console.log("Firebase Token obtained:", token ? "Yes" : "No");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 font-Lora p-4">
      <div className="w-full max-w-md p-8 rounded-2xl liquid-card shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Login</h1>
          <p className="text-accent">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-base-300 focus:border-secondary focus:outline-none bg-base-100 text-neutral"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg border border-base-300 focus:border-secondary focus:outline-none bg-base-100 text-neutral"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-base-100 py-3 rounded-lg hover:bg-secondary transition-colors flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ImSpinner3 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-accent mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
