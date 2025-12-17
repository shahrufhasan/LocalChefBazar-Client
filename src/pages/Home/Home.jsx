import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner";
import OrderingBanner from "../../components/Home/OrderingBanner";
import FeaturedMeals from "../../components/Home/FeaturedMeals";
import CustomerReviews from "../../components/Home/CustomerReviews";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | LocalChefBazaar</title>
      </Helmet>

      <Banner />
      <FeaturedMeals />
      <OrderingBanner />
      <WhyChooseUs />
      <CustomerReviews />
    </div>
  );
};

export default Home;
