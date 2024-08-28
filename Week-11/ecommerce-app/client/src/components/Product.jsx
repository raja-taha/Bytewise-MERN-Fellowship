import React from "react";
import heartIcon from "../assets/heartIcon.png";
import eyeIcon from "../assets/eyeIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import { useNavigate } from "react-router-dom";
import { handleAddToWishlist } from "../utils/wishlistController";
import { addToCart } from "../utils/cartController";

const Product = ({ product, wishlist, onRemove }) => {
  const { _id, name, price, image } = product;

  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${_id}`); // Navigate to the product details page
  };

  return (
    <div className="flex flex-col justify-between relative font-poppins border border-button border-opacity-30 rounded-lg p-4 shadow-md">
      <div>
        {image && image.url ? (
          <img
            src={image.url}
            alt={name}
            className="w-48 object-cover rounded-lg mb-4 mx-auto hover:cursor-pointer"
            onClick={handleViewProduct}
          />
        ) : (
          <div className="w-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2 flex-col m-2">
          {wishlist ? (
            <button
              className="bg-text1 bg-opacity-30 p-2 rounded-full"
              onClick={onRemove}
            >
              <img src={deleteIcon} alt="Remove from wishlist" width={20} />
            </button>
          ) : (
            <button
              className="bg-text1 bg-opacity-30 p-2 rounded-full"
              onClick={handleAddToWishlist(product)}
            >
              <img src={heartIcon} alt="wishlist" width={20} />
            </button>
          )}

          <button
            className="bg-text1 bg-opacity-30 p-2 rounded-full"
            onClick={handleViewProduct}
          >
            <img src={eyeIcon} alt="View" width={20} />
          </button>
        </div>
      </div>
      <div>
        <button
          className="bg-button text-text w-full p-2"
          onClick={() => addToCart(product._id)}
        >
          Add to cart
        </button>
        <h3 className="text-[16px] font-semibold mt-4 mb-2">{name}</h3>
        <p className="text-secondary2 text-[16px] font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Product;
