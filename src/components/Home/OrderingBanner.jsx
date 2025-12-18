import React from "react";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";

const OrderingBanner = () => {
  return (
    <div className="py-16 max-w-6xl mx-auto">
      <div className="text-center  mb-12">
        <h2 className="text-4xl font-bold">Order in just 10 minutes</h2>
        <p className="text-gray-500">
          Simple steps to get fresh meals delivered fast
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <img src={icon1} className="w-40 p-4" alt="Icon 1" />
          <h4 className="text-2xl font-bold mt-4">Order your food</h4>
          <p className="px-4 mt-2 max-w-sm text-gray-500">
            Browse our menu, choose your favorite dishes, and place your order
            in just a few clicks.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src={icon2} className="w-40" alt="Icon 2" />
          <h4 className="text-2xl font-bold mt-4">Delivery & Pickup</h4>
          <p className="px-4 mt-2 max-w-sm text-gray-500">
            Get your meal delivered to your doorstep or pick it up from your
            local chef at your convenience.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src={icon3} className="w-40" alt="Icon 3" />
          <h4 className="text2xl font-bold mt-4">Delicious Recipe</h4>
          <p className="px-4 mt-2 max-w-sm text-gray-500">
            Enjoy freshly prepared, home-cooked meals made from authentic
            recipes by local chefs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderingBanner;
