// utils/addToWishlist.js
import { toast } from "react-toastify";

export const handleAddToWishlist = (product) => () => {
  const role = localStorage.getItem("role");

  if (role === "visitor" || role === null) {
    toast.error("Please log in to add products to your wishlist");
    return;
  }

  // Get the current wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Check if the product is already in the wishlist
  if (wishlist.find((item) => item._id === product._id)) {
    toast.error("Product is already in your wishlist");
    return;
  }

  // Add the new product to the wishlist
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  toast.success("Product added to wishlist!");
};

export const handleRemoveFromWishlist = (id, setWishlistItems) => {
  // Retrieve the current wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Filter out the item to remove
  const updatedWishlist = wishlist.filter((item) => item._id !== id);

  // Update localStorage with the updated wishlist
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  // Update the state
  setWishlistItems(updatedWishlist);

  toast.success("Product removed from the wishlist!");
};
