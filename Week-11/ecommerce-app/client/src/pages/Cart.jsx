// components/Cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import deleteIcon from "../assets/deleteIcon.png";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartFromLocalStorage);
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      // Fetch product from the backend
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/${productId}`
      );
      const product = response.data;

      if (product.stock >= quantity) {
        const updatedCart = cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        toast.error("This product is out of stock");
      }
    } catch (error) {
      // Handle errors such as network issues or backend errors
      toast.error("Failed to update product quantity. Please try again later.");
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="w-[80%] mx-auto">
      {cart.length === 0 ? (
        <div className="flex flex-col space-y-16 justify-center items-center my-28">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] md:text-[80px] lg:text-[110px] font-inter font-medium tracking-wider">
              Empty Cart
            </p>
            <p className="font-poppins text-[16px]">
              Your cart is empty. Please visit the shop.
            </p>
          </div>
          <Button text="Back to shop" href="/shop" />
        </div>
      ) : (
        <>
          <h2 className="text-[24px] font-semibold font-inter my-10">
            Your Cart
          </h2>
          <div className="hidden md:flex justify-between px-10 py-4 text-[16px] font-poppins font-semibold border-2 border-button border-opacity-30 rounded-md shadow-md my-5">
            <div className="grid grid-cols-5 gap-4 w-full">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span className="text-right">Remove</span>
            </div>
          </div>

          {cart.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-1 md:grid-cols-5  gap-4 px-10 py-4 text-[16px] font-poppins border-2 border-button border-opacity-30 rounded-md shadow-md my-5"
            >
              <div className="flex gap-5 sm:gap-10 md:gap-0 items-center">
                <p className="md:hidden font-semibold">Product</p>
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="hidden md:block w-12 object-cover"
                />
                <span className="ml-4">{product.name}</span>
              </div>
              <div className="flex gap-5 sm:gap-10 items-center">
                <p className="md:hidden font-semibold">Price</p>
                <span>${product.price}</span>
              </div>
              <div className="flex gap-5 sm:gap-10 items-center ">
                <p className="md:hidden font-semibold">Quantity</p>
                <div className="border-t border-b border-gray-300 rounded">
                  <button
                    className="border-l border-r border-gray-300 px-2 py-1 rounded-l"
                    onClick={() =>
                      updateQuantity(product._id, product.quantity - 1)
                    }
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 h-3 ">{product.quantity}</span>
                  <button
                    className="border-l border-r border-gray-300 px-2 py-1 rounded-r"
                    onClick={() =>
                      updateQuantity(product._id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-5 sm:gap-10 items-center">
                <p className="md:hidden font-semibold">Subtotal</p>
                <span>${product.price * product.quantity}</span>
              </div>

              <div className="text-right">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-red-500 ml-2"
                >
                  <img src={deleteIcon} alt="remove" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
              <Link
                className="bg-button2 text-text p-2 text-[16px] font-medium font-poppins rounded hover:bg-hoverButton"
                to={"/shop"}
              >
                Return To Shop
              </Link>
              <div className="flex gap-1 flex-col md:flex-row">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-full border focus:outline-secondary2 p-1 md:p-2 rounded mr-2 text-[16px] font-poppins"
                />
                <button className="bg-button2 text-text p-1 md:p-2 text-[16px] font-medium font-poppins rounded hover:bg-hoverButton">
                  Apply Coupon
                </button>
              </div>
            </div>

            <div className="flex justify-end items-center my-10">
              <div className="w-full md:w-1/2 lg:w-1/3 border-2 border-button border-opacity-30 rounded-md shadow-md p-4">
                <h3 className="text-[20px] font-medium mb-5">Cart Total</h3>
                <div className="flex justify-between my-2">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <hr className=" opacity-30 text-button" />
                <div className="flex justify-between my-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr className=" opacity-30 text-button" />
                <div className="flex justify-between font-semibold my-2">
                  <span>Total:</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-center mt-6">
                  <Link
                    className="bg-button2 text-text p-2 text-[16px] font-medium font-poppins rounded hover:bg-hoverButton"
                    to={"/user/billing"}
                  >
                    Proceed to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
