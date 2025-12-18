import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../utilities";

const ProfileCard = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user info from DB
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        if (res.data && res.data.length > 0) {
          setCurrentUser(res.data[0]);
          setFormData({
            name: res.data[0].name || user.displayName,
            photoURL: res.data[0].photoURL || user.photoURL,
            address: res.data[0].address || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = formData.photoURL;

      if (imageFile) {
        photoURL = await imageUpload(imageFile);
      }

      await updateUser({
        displayName: formData.name,
        photoURL: photoURL,
      });

      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name: formData.name,
        photoURL: photoURL,
        address: formData.address,
      });

      if (res.data.modifiedCount > 0) {
        setCurrentUser({
          ...currentUser,
          name: formData.name,
          photoURL: photoURL,
          address: formData.address,
        });

        setFormData({
          ...formData,
          photoURL: photoURL,
        });

        Swal.fire("Success!", "Profile updated successfully", "success");
        setIsEditing(false);
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (type) => {
    const requestData = {
      userName: currentUser.name || user.displayName,
      userEmail: currentUser.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);
      if (res.data.insertedId) {
        Swal.fire(
          "Success",
          `Your request to become ${type} has been sent!`,
          "success"
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send request", "error");
    }
  };

  if (!currentUser)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-2xl">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-red-300 to-green-300"></div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Profile Image */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <img
                  src={
                    imagePreview ||
                    formData.photoURL ||
                    user.photoURL ||
                    "https://via.placeholder.com/150"
                  }
                  alt={formData.name || user.displayName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    rows="3"
                    placeholder="Enter your delivery address"
                  />
                </div>

                {imageFile && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      New image selected: {imageFile.name}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span>
                        Updating...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    onClick={() => {
                      setIsEditing(false);
                      setImageFile(null);
                      setImagePreview(null);
                      setFormData({
                        name: currentUser.name || user.displayName,
                        photoURL: currentUser.photoURL || user.photoURL,
                        address: currentUser.address || "",
                      });
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-1">
                    {currentUser.name || user.displayName}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                      {currentUser.role || "user"}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        currentUser.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {currentUser.status || "active"}
                    </span>
                  </div>

                  {currentUser.role === "chef" && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Chef ID</p>
                      <p className="font-semibold text-gray-800">
                        {currentUser.chefId}
                      </p>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">
                      Delivery Address
                    </p>
                    <p className="text-gray-800">
                      {currentUser.address || "Not set"}
                    </p>
                  </div>
                </div>

                <button
                  className="w-full btn btn-outline btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>

                {/* Request Buttons */}
                <div className="flex gap-3">
                  {currentUser.role !== "chef" &&
                    currentUser.role !== "admin" && (
                      <button
                        className="flex-1 btn btn-outline btn-secondary"
                        onClick={() => sendRequest("chef")}
                      >
                        Become a Chef
                      </button>
                    )}
                  {currentUser.role !== "admin" && (
                    <button
                      className="flex-1 btn btn-outline btn-secondary"
                      onClick={() => sendRequest("admin")}
                    >
                      Become an Admin
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
