import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [usersCount, setUsersCount] = useState(0);
  const [mealsCount, setMealsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const usersRes = await axiosSecure.get("/users");
        const mealsRes = await axiosSecure.get("/meals?limit=1000");
        const ordersRes = await axiosSecure.get("/orders");

        setUsersCount(usersRes.data.length);
        setMealsCount(mealsRes.data.meals?.length || mealsRes.data.length);
        setOrdersCount(ordersRes.data.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  const chartData = [
    {
      name: "Users",
      count: usersCount,
      fill: "#8884d8",
    },
    {
      name: "Meals",
      count: mealsCount,
      fill: "#82ca9d",
    },
    {
      name: "Orders",
      count: ordersCount,
      fill: "#ffc658",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Helmet>
        <title>Platform Statistics | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg rounded-lg text-center">
          <p className="text-lg font-semibold opacity-90">Total Users</p>
          <p className="text-4xl font-bold mt-2">{usersCount}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg rounded-lg text-center">
          <p className="text-lg font-semibold opacity-90">Total Meals</p>
          <p className="text-4xl font-bold mt-2">{mealsCount}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg rounded-lg text-center">
          <p className="text-lg font-semibold opacity-90">Total Orders</p>
          <p className="text-4xl font-bold mt-2">{ordersCount}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-base-100 shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Visual Overview</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformStatistics;
