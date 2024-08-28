import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, reset } from "../features/order/orderSlice"; // Adjust the path as necessary
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

const formatDate = (serverDate) => {
  const date = new Date(serverDate);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formattedDate;
};

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors to get the order state from Redux store
  const { orders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.order
  );

  // Fetch the user ID from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    } else {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [dispatch, userId, navigate]);

  useEffect(() => {
    if (isSuccess) {
      console.log(orders);
    }

    if (isError) {
      toast.error(message || "Failed to fetch orders");
    }

    // Reset state after showing messages, only if there's a success or error
    if (isSuccess || isError) {
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch, orders]);

  return (
    <div className="w-[80%] mx-auto">
      <h2 className="text-[24px] font-semibold font-inter my-10">
        Your Orders
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded text-[16px]">
              <h3 className="font-semibold text-[16px] md:text-[20px] mb-2">
                Order #{order._id}
              </h3>
              <div className="grid  grid-cols-1 md:grid-cols-2">
                <div className="border-b md:border-r md:border-b-0">
                  <div className="mb-4">
                    <h4 className="font-medium">Customer Details</h4>
                    <p>Name: {order.customerDetails.firstName}</p>
                    <p>Email: {order.customerDetails.emailAddress}</p>
                    <p>Phone: {order.customerDetails.phoneNumber}</p>
                    <p>
                      Address: {order.customerDetails.streetAddress},{" "}
                      {order.customerDetails.city}
                    </p>
                    <p>Date: {formatDate(order.createdAt)}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium">Payment Details</h4>
                    <p>Method: {order.paymentDetails.method}</p>
                    {order.paymentDetails.method === "card" && (
                      <>
                        <p>
                          Card Number:{" "}
                          {order.paymentDetails.cardDetails.cardNumber}
                        </p>
                        <p>
                          Expiry Date:{" "}
                          {order.paymentDetails.cardDetails.expiryDate}
                        </p>
                        <p>
                          Name on Card:{" "}
                          {order.paymentDetails.cardDetails.nameOnCard}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="md:ml-5">
                  <div className="mb-4">
                    <h4 className="font-medium">Order Items</h4>
                    <div className="grid grid-cols-3 space-x-4">
                      <div className="font-semibold">Product</div>
                      <div className="font-semibold">Quantity</div>
                      <div className="font-semibold">Price</div>

                      {order.orderItems.map((item) => (
                        <React.Fragment key={item.id._id}>
                          <div className=" rounded-lg">{item.id.name}</div>
                          <div className=" rounded-lg">{item.quantity}</div>
                          <div className=" rounded-lg">${item.id.price}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      $
                      {order.orderItems.reduce(
                        (acc, item) => acc + item.id.price * item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="my-10">
        <Button text={"Order More"} href={"/shop"} />
      </div>
    </div>
  );
};

export default Orders;
