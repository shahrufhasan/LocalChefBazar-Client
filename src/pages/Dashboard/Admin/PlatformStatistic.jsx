import React, { useEffect, useState } from "react";
import axiosPublic from "../../../hooks/useAxiosPublic";

const PlatformStatistics = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [mealsCount, setMealsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axiosPublic.get("/users");
        const mealsRes = await axiosPublic.get("/meals");
        const ordersRes = await axiosPublic.get("/orders");

        setUsersCount(usersRes.data.length);
        setMealsCount(mealsRes.data.length);
        setOrdersCount(ordersRes.data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-base-100 shadow rounded-lg text-center">
          <p className="text-xl font-semibold">Users</p>
          <p className="text-3xl">{usersCount}</p>
        </div>
        <div className="p-4 bg-base-100 shadow rounded-lg text-center">
          <p className="text-xl font-semibold">Meals</p>
          <p className="text-3xl">{mealsCount}</p>
        </div>
        <div className="p-4 bg-base-100 shadow rounded-lg text-center">
          <p className="text-xl font-semibold">Orders</p>
          <p className="text-3xl">{ordersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
