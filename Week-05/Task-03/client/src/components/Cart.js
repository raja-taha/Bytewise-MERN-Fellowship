import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const Cart = ({ cartItems, removeFromCart, onConfirmOrder }) => {
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="bg-white w-full border-2 rounded-xl p-5 mt-5 md:my-5">
      <h1 className="text-2xl font-bold text-red-500 mb-5">
        Your Cart ({calculateTotalQuantity()})
      </h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt="Empty Cart Illustration"
          />
          <p className="text-rose-400 text-center mt-3">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-y-auto max-h-[50vh] pr-5">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center border-b-2 py-2"
              >
                <div>
                  <p className="text-lg font-bold text-rose-500">{item.name}</p>
                  <div className="flex space-x-4">
                    <p className="text-red-500 font-bold">{item.quantity}x</p>
                    <p className="text-rose-300">@${item.price.toFixed(2)}</p>
                    <p className="font-bold text-rose-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlineCancel
                    onClick={() => removeFromCart(item.name)}
                    className="text-rose-500 font-bold text-xl cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between items-center">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-xl font-bold text-red-500">
              ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>
          <button
            onClick={onConfirmOrder}
            className="bg-red-500 text-white px-4 py-2 rounded-full mt-5 w-full hover:text-red-500 hover:bg-white border-2 border-red-500 font-bold transition delay-50"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
