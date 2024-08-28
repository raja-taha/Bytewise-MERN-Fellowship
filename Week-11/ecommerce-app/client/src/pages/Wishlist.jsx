import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner"; // Assuming you have a Spinner component
import Product from "../components/Product";
import { handleRemoveFromWishlist } from "../utils/wishlistController";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = () => {
      try {
        // Simulate loading delay
        setTimeout(() => {
          const storedWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          setWishlistItems(storedWishlist);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load wishlist.");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    handleRemoveFromWishlist(id, setWishlistItems);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-[80%] mx-auto">
      <h2 className="text-[24px] font-semibold font-inter my-10">
        Your Wishlist
      </h2>
      {wishlistItems.length === 0 ? (
        <p className="text-[20px] font-inter my-10">Your wishlist is empty.</p>
      ) : (
        <div className="my-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {wishlistItems.map((item) => (
              <Product
                key={item._id}
                product={item}
                wishlist
                onRemove={() => removeFromWishlist(item._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
