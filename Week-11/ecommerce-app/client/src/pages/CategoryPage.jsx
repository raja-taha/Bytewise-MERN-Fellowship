import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

// Helper function to capitalize the first letter of each word
const capitalizeWords = (text) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const CategoryPage = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        // Fetch products by category ID
        const productsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/category/${id}`
        );
        setProducts(productsResponse.data);

        // Fetch category name by category ID
        const categoryResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories/${id}`
        );
        setCategoryName(categoryResponse.data.name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[80%] mx-auto my-5">
      <h2 className="text-[30px] font-poppins font-semibold my-3">
        {`${capitalizeWords(categoryName)}`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p>No products available in this category</p>
        ) : (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
