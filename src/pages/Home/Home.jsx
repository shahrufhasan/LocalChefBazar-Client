import React from "react";
import Banner from "../../components/Home/Banner";
import OrderingBanner from "../../components/Home/OrderingBanner";
import FeaturedMeals from "../../components/Home/FeaturedMeals";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OrderingBanner></OrderingBanner>
      <FeaturedMeals></FeaturedMeals>
    </div>
  );
};

export default Home;
