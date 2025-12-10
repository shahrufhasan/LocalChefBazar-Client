import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import banner1 from "../../assets/1.png";
import banner2 from "../../assets/2.png";
import banner3 from "../../assets/3.png";

const banners = [banner1, banner2, banner3];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[260px] md:h-[700px] pt-16">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={banners[current]}
          alt={`Banner ${current + 1}`}
          className="w-full h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default Banner;
