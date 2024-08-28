import axios from "axios";
import { toast } from "react-toastify";

export const addToCart = async (productId) => {
  const role = localStorage.getItem("role");

  if (role === "visitor" || role === null) {
    toast.error("Please log in to add products to your wishlist");
    return;
  }

  try {
    // Fetch product from the backend
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${productId}`
    );
    const product = response.data;

    if (product.stock > 0) {
      // Retrieve cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product already exists in the cart
      const productIndex = cart.findIndex((item) => item._id === product._id);

      if (productIndex === -1) {
        // Add product with quantity 1
        cart.push({ ...product, quantity: 1 });
        toast.success("Product added to cart!");
      } else {
        toast.error("Product is already in the cart");
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      toast.error("This product is out of stock");
    }
  } catch (error) {
    // Handle errors such as network issues or backend errors
    toast.error("Failed to add product to cart. Please try again later.");
  }
};
