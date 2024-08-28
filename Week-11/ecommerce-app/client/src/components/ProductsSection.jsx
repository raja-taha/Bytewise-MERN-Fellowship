import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";

const ProductsSection = ({ limit = 0, product, shop, filterCategory = "" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products`
        );
        const fetchedProducts = response.data;

        // Apply category filter if provided
        const filteredProducts = filterCategory
          ? fetchedProducts.filter((product) =>
              product.category.name
                .toLowerCase()
                .includes(filterCategory.toLowerCase())
            )
          : fetchedProducts;

        setProducts(filteredProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterCategory]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  // Slice the products array to display a maximum of `limit` products
  const displayedProducts = limit > 0 ? products.slice(0, limit) : products;

  return (
    <div>
      {!shop && (
        <h3 className="border-secondary2 border-l-8 my-3">
          <span className="text-[16px] font-poppins font-semibold text-secondary2 ml-3">
            Our Products
          </span>
        </h3>
      )}
      {!product && (
        <div className="flex justify-between items-center">
          <h2
            className={`font-inter font-semibold my-3 ${
              shop
                ? "text-[20px] md:text-[24px] mt-10"
                : "text-[24px] md:text-[36px]"
            }`}
          >
            Explore Our Products
          </h2>
        </div>
      )}

      <div>
        {displayedProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayedProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;
