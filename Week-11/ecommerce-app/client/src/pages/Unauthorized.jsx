import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";

const Unauthorized = () => {
  return (
    <div className="w-[80%] mx-auto">
      <div className="mt-16">
        <Breadcrumb />
      </div>
      <div className="flex flex-col space-y-16 justify-center items-center my-28">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[30px] md:text-[80px] lg:text-[110px] font-inter font-medium tracking-wider">
            Unauthorized
          </p>
          <p className="font-poppins text-[16px]">
            Your don't have access to this page. You may go home page.
          </p>
        </div>
        <Button text="Back to home page" href="/" />
      </div>
    </div>
  );
};

export default Unauthorized;
