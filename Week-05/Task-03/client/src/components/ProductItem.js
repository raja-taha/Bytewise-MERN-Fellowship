import React, { useState } from "react";

const ProductItem = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const getImageUrl = () => {
    const screenWidth = window.innerWidth;
    let imageUrl = product.image.mobile;

    if (screenWidth >= 1024) {
      imageUrl = product.image.desktop;
    } else if (screenWidth >= 768) {
      imageUrl = product.image.tablet;
    }

    return imageUrl;
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="mb-5 md:p-5 w-full flex flex-col md:w-1/3">
      <img
        src={getImageUrl()}
        alt={product.name}
        className="w-full object-contain rounded-xl h-[40vh] md:h-full"
      />
      <div className="py-4 flex flex-col justify-between bg-white rounded-b-xl">
        <div>
          <p className="text-gray-500 text-sm mb-1">{product.category}</p>
          <p className="text-lg font-bold mb-1">{product.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r"
            >
              +
            </button>
          </div>
          <p className="text-xl font-bold text-red-500">${product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-red-500 text-white px-4 py-2 rounded-full mt-2 hover:text-red-500 hover:bg-white border-2 border-red-500 font-bold transition delay-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
