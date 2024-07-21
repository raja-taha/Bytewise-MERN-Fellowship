import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmationModal = ({ cartItems, onConfirm, onClose }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <div className="flex-col justify-center items-center mb-8">
          <FaCheckCircle className="text-green-500 text-3xl" />
          <h1 className="text-2xl font-bold mt-4">Order Confirmed</h1>
          <p className=" text-rose-300 mb-4">We hope you enjoy your food!</p>
        </div>
        <div className="mb-8 overflow-y-auto max-h-[50vh] pr-5">
          {cartItems.map((item) => (
            <div key={item.name} className="flex justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <div className="flex space-x-4">
                    <p className="text-red-500 font-bold">{item.quantity}x</p>
                    <p className="text-rose-300">@${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-md text-rose-400">Order Total</p>
          <p className="text-2xl font-bold text-black">
            ${calculateTotalPrice().toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-full w-full hover:text-red-500 hover:bg-white border-2 border-red-500 font-bold transition delay-50"
          >
            Start New Order
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-full w-full hover:text-red-500 hover:bg-white border-2 border-red-500 font-bold transition delay-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
