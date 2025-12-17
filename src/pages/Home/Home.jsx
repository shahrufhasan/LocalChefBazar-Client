import React from "react";
import Banner from "../../components/Home/Banner";
import OrderingBanner from "../../components/Home/OrderingBanner";
import FeaturedMeals from "../../components/Home/FeaturedMeals";
import CustomerReviews from "../../components/Home/CustomerReviews";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OrderingBanner></OrderingBanner>
      <FeaturedMeals></FeaturedMeals>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default Home;
