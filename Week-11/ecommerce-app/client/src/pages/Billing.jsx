import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, reset } from "../features/order/orderSlice"; // Adjust the path as necessary
import { toast } from "react-toastify"; // Import toast and ToastContainer
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const BillingComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors to get the order state from Redux store
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.order
  );

  // State for cart items and user details fetched from localStorage
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
  });

  // State for payment method and card details
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    cvc: "",
    expiryDate: "",
  });

  // Fetch cart items and user details from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const storedUserDetails = JSON.parse(localStorage.getItem("user")) || {};

    setCartItems(storedCartItems);
    setUserDetails(storedUserDetails);
  }, []);

  // Handle change for customer details
  const handleCustomerDetailsChange = (e) => {
    const { id, value } = e.target;
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  // Handle change for payment method
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (event) => {
    const { id, value } = event.target;

    if (id === "cardNumber") {
      const input = value.replace(/\D/g, ""); // Remove non-numeric characters
      const formattedInput = input.replace(/(.{4})/g, "$1 ").trim(); // Format with spaces every 4 digits
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        cardNumber: formattedInput,
      }));
    } else if (id === "expiryDate") {
      const input = value.replace(/\D/g, ""); // Remove non-numeric characters
      const formattedInput =
        input.length > 1 ? `${input.slice(0, 2)}/${input.slice(2, 4)}` : input;
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        expiryDate: formattedInput,
      }));
    } else if (id === "cvc") {
      const input = value.replace(/\D/g, ""); // Remove non-numeric characters
      const formattedInput = input.slice(0, 3); // Limit to 3 digits
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        cvc: formattedInput,
      }));
    } else {
      setCardDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
    }
  };

  const handlePlaceOrder = async () => {
    // Create the order object
    const order = {
      userId: userDetails._id,
      customerDetails, // This is updated by the form
      orderItems: cartItems.map((item) => ({
        id: item._id,
        quantity: item.quantity,
      })),
      paymentDetails:
        paymentMethod === "bank"
          ? {
              method: "card",
              cardDetails,
              totalPrice: cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ),
            }
          : {
              method: "cash",
              totalPrice: cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ),
            },
    };

    // Dispatch the createOrder action
    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message || "Order placed successfully!"); // Show success toast
      setCartItems([]); // Clear the cart items
      localStorage.removeItem("cart"); // Clear the cart from localStorage
      navigate("/shop");
    }

    if (isError) {
      toast.error(message || "Failed to place the order"); // Show error toast
    }

    // Reset state after showing messages
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  return (
    <div className="w-[80%] mx-auto">
      <h2 className="text-[24px] font-semibold font-inter my-10">
        Billing Details
      </h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col space-y-16 justify-center items-center my-28">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] md:text-[80px] lg:text-[110px]  font-inter font-medium tracking-wider">
              Empty Cart
            </p>
            <p className="font-poppins text-[16px]">
              Your cart is empty. Please visit the shop.
            </p>
          </div>
          <Button text="Back to shop" href="/shop" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between my-10">
          <div className="">
            <div className="space-y-4">
              {/* Customer Details Form */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={customerDetails.firstName}
                    onChange={handleCustomerDetailsChange}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={customerDetails.companyName}
                    onChange={handleCustomerDetailsChange}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-medium"
                  >
                    Street Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    value={customerDetails.streetAddress}
                    onChange={handleCustomerDetailsChange}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium">
                    Town/City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={customerDetails.city}
                    onChange={handleCustomerDetailsChange}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium"
                  >
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={customerDetails.phoneNumber}
                    onChange={handleCustomerDetailsChange}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium"
                  >
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    value={customerDetails.emailAddress}
                    onChange={handleCustomerDetailsChange}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary and Payment */}
          <div className="py-5 md:px-5">
            {/* Order Summary */}
            <div className="mb-5">
              <h3 className="font-semibold text-xl mb-2">Your Order</h3>
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={`${item.image.url}`}
                      alt={item.name}
                      className="w-14 mr-3"
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>${item.price}</span>
                </div>
              ))}
              <hr className="my-3 opacity-30 text-button " />
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <hr className="my-3 opacity-30 text-button " />
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-5">
              <h3 className="font-semibold text-xl mb-2">Payment Method</h3>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="bank" className="text-sm">
                  Bank
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="cod" className="text-sm">
                  Cash on delivery
                </label>
              </div>

              {/* Conditionally Render Card Payment Fields */}
              {paymentMethod === "bank" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="nameOnCard"
                      className="block text-sm font-medium"
                    >
                      Name on Card<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      value={cardDetails.nameOnCard}
                      onChange={handleCardDetailsChange}
                      className="mt-1 block w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium"
                    >
                      Card Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                      className="mt-1 block w-full p-2 border rounded"
                      maxLength="19" // Max length to accommodate formatting (4 groups of 4 digits + 3 spaces)
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium"
                      >
                        Expiry Date<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardDetailsChange}
                        className="mt-1 block w-full p-2 border rounded"
                        maxLength="5" // Max length to accommodate formatting (MM/YY)
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium"
                      >
                        CVC<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        value={cardDetails.cvc}
                        onChange={handleCardDetailsChange}
                        className="mt-1 block w-full p-2 border rounded"
                        maxLength="3" // Max length for CVC (3 digits)
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingComponent;
