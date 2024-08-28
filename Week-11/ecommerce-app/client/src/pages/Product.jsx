import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import heartIcon from "../assets/heartIcon.png";
import deliveryIconWhite from "../assets/deliveryIconWhite.png";
import returnIcon from "../assets/returnIcon.png";
import ProductsSection from "../components/ProductsSection";
import Spinner from "../components/Spinner";
import { handleAddToWishlist } from "../utils/wishlistController";
import { addToCart } from "../utils/cartController";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center my-10">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[80%] mx-auto">
      {product && (
        <div className="flex flex-col lg:flex-row py-10">
          <div className="flex flex-1">
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full object-contain mb-4 rounded-sm "
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="lg:w-[60%] mx-auto">
              <h1 className="text-[24px] font-semibold font-inter">
                {product.name}
              </h1>
              <p className="text-[20px] font-inter">
                $ {product.price.toFixed(2)}
              </p>
              {product.stock === 0 ? (
                <p className="text-[16px] font-inter text-secondary2">
                  Out of Stock
                </p>
              ) : (
                <p className="text-[16px] font-inter text-button1">In Stock</p>
              )}
              <p className="my-6">{product.description}</p>
              <hr className="mb-10 opacity-30 text-button" />
              <div className="flex gap-4">
                <button
                  className="bg-button2 text-text py-2 w-full text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
                  onClick={() => addToCart(product._id)} // Correctly pass function as callback
                >
                  Add to Cart
                </button>
                <button
                  className="bg-text1 bg-opacity-30 p-2 rounded-sm"
                  onClick={() => handleAddToWishlist(product)} // Correctly pass function as callback
                >
                  <img src={heartIcon} alt="wishlist" width={30} />
                </button>
              </div>
              <div className="my-10 ">
                <div className="flex border-2 border-button border-opacity-30 pr-3 lg:pr-0">
                  <img src={deliveryIconWhite} alt="delivery" className="m-4" />
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-[16px] font-medium">Free Delivery</p>
                    <p className="text-[12px] font-medium underline">
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>
                <div className="flex border-2 border-button border-opacity-30 border-t-0 pr-3 lg:pr-0">
                  <img src={returnIcon} alt="return" className="m-4" />
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-[16px] font-medium">Return Delivery</p>
                    <p className="text-[12px] font-medium underline">
                      Free 30 Days Delivery Returns. Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="my-10">
        <ProductsSection product filterCategory={product.category.name} />
      </div>
    </div>
  );
};

export default Product;
