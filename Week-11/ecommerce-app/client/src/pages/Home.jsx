import React, { useEffect, useState } from "react";
import heroImage from "../assets/heroImage.jpg";
import bannerImage from "../assets/bannerImage.jpg";
import CategoriesSection from "../components/CategoriesSection";
import ProductsSection from "../components/ProductsSection";
import Button from "../components/Button";
import Features from "../components/Features";

const Home = () => {
  const [productLimit, setProductLimit] = useState(8);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Example breakpoint for small screens
        setProductLimit(2);
      } else if (window.innerWidth < 1200) {
        setProductLimit(4);
      } else {
        setProductLimit(8);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="w-[80%] mx-auto ">
      <div className="flex justify-center items-center">
        <img src={heroImage} alt="hero" className="m-10" />
      </div>
      <hr className="mt-5 mb-10 opacity-30 text-button " />
      <CategoriesSection />
      <hr className="mt-10 mb-5 opacity-30 text-button " />
      <div className="flex justify-center items-center">
        <img src={bannerImage} alt="banner" className="m-10" />
      </div>
      <hr className="mt-5 mb-10 opacity-30 text-button " />
      <ProductsSection limit={productLimit} />
      <div className="flex justify-center items-center my-10">
        <Button text={"View All Products"} href={"/shop"} />
      </div>
      <hr className="mt-10 mb-10 opacity-30 text-button " />
      <Features />
    </div>
  );
};

export default Home;
