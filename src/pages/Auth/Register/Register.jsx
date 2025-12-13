import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utilities";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser, updateUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { name, email, password, image } = data;
      const imageFile = image[0];

      // Upload image
      const imageURL = await imageUpload(imageFile);

      // Register user in Firebase
      const result = await registerUser(email, password);

      // Update user profile correctly
      await updateUser({ displayName: name, photoURL: imageURL });

      const userInfo = { email, displayName: name, photoURL: imageURL };
      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
      console.log(result);
    } catch (err) {
      console.error("Registration Error:", err);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 font-Lora p-4">
      <div className="w-full max-w-md p-8 rounded-2xl liquid-card shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Register</h1>
          <p className="text-accent">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg border border-base-300 focus:border-secondary focus:outline-none bg-base-100 text-neutral"
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 20, message: "Name cannot be too long" },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-neutral
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-base-300 file:text-primary
                hover:file:bg-base-200
                border border-dashed border-base-300 rounded-lg cursor-pointer
                focus:outline-secondary py-2"
              {...register("image", { required: "Profile image is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

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
                  message: "Please enter a valid email address",
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-lg border border-base-300 focus:border-secondary focus:outline-none bg-base-100 text-neutral"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-base-100 py-3 rounded-lg hover:bg-secondary transition-colors flex justify-center items-center"
          >
            {loading ? <ImSpinner3 className="animate-spin" /> : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-accent mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
