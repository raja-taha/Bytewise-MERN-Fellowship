import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsSection from "../components/ProductsSection";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories`
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-[80%] mx-auto">
      <div className="mt-4 lg:my-10 lg:w-[20%] lg:border-r-2 p-4">
        <h2 className="text-[24px] font-poppins font-bold">Categories</h2>
        <div className="flex flex-wrap gap-3 lg:gap-0 lg:flex-col justify-start items-start mt-6">
          {/* "All" button */}
          <button
            className={`my-2 hover:underline ${
              selectedCategory === "" ? "font-semibold text-secondary2" : ""
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category._id}
              className={`my-2 hover:underline ${
                selectedCategory === category.name
                  ? "font-semibold text-secondary2"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="main-content flex-1 mb-5 lg:p-4 lg:w-[80%] lg:mx-4">
        <ProductsSection filterCategory={selectedCategory} shop />
      </div>
    </div>
  );
};

export default Shop;
