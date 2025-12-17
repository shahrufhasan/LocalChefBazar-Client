import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../hooks/useAxiosPublic";
import { imageUpload } from "../../../utilities";

const Register = () => {
  const { registerUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { name, email, password, confirmPassword, address, image } = data;

      if (password !== confirmPassword) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Passwords do not match",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const imageFile = image[0];

      const imageURL = await imageUpload(imageFile);

      await registerUser(email, password);

      await updateUser({
        displayName: name,
        photoURL: imageURL,
      });

      const userInfo = {
        name,
        email,
        photoURL: imageURL,
        address,
        role: "user",
        status: "active",
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Registered",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location.state || "/");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Registration Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join and start your journey with LocalChefBazar
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">Name is required</p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">Address is required</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                Profile image is required
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                Confirm Password is required
              </p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-2">Register</button>
        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
