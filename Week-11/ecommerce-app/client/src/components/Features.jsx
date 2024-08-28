import React from "react";
import servicesIcon from "../assets/servicesIcon.png";
import deliveryIcon from "../assets/deliveryIcon.png";
import customerIcon from "../assets/customerIcon.png";
import securityIcon from "../assets/securityIcon.png";

const Features = () => {
  return (
    <div className="flex flex-col gap-20 md:gap-4 lg:gap-20 md:flex-row justify-center items-center font-poppins  mt-10 mb-20">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[70px] ">
          <img
            src={servicesIcon}
            alt="services"
            className="w-full h-auto block"
          />
          <img
            src={deliveryIcon}
            alt="delivery"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h3 className="text-[20px]  font-semibold mt-6 mb-2">
          FREE AND FAST DELIVERY
        </h3>
        <p className="text-[14px]">Free delivery for all orders over $140</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[70px] ">
          <img
            src={servicesIcon}
            alt="services"
            className="w-full h-auto block"
          />
          <img
            src={customerIcon}
            alt="delivery"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h3 className="text-[20px]  font-semibold mt-6 mb-2">
          24/7 CUSTOMER SERVICE
        </h3>
        <p className="text-[14px]">Friendly 24/7 customer support</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[70px] ">
          <img
            src={servicesIcon}
            alt="services"
            className="w-full h-auto block"
          />
          <img
            src={securityIcon}
            alt="delivery"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h3 className="text-[20px]  font-semibold mt-6 mb-2">
          MONEY BACK GUARANTEE
        </h3>
        <p className="text-[14px]">We reurn money within 30 days</p>
      </div>
    </div>
  );
};

export default Features;
