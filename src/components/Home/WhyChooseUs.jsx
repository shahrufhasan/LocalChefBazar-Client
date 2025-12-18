import React from "react";
import { FaHome, FaHeart, FaShieldAlt, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHome className="text-5xl text-primary" />,
      title: "Home-Cooked Quality",
      description:
        "Every meal is prepared fresh in local home kitchens with love and care, just like mom used to make.",
    },
    {
      icon: <FaHeart className="text-5xl text-secondary" />,
      title: "Support Local Chefs",
      description:
        "Help talented home cooks in your community earn income while enjoying authentic, homemade food.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-accent" />,
      title: "Safe & Reliable",
      description:
        "All our chefs are verified, and we ensure the highest standards of food safety and hygiene.",
    },
    {
      icon: <FaClock className="text-5xl text-info" />,
      title: "Fast Delivery",
      description:
        "Get your fresh meals delivered quickly to your doorstep, hot and ready to enjoy.",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">
            Why Choose LocalChefBazaar?
          </h2>
          <p className="text-gray-500 text-lg">
            Experience the authentic taste of home-cooked meals from local chefs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-xl transition-shadow bg-base-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
