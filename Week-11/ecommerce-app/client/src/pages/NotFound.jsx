import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <div className="w-[80%] mx-auto">
      <div className="mt-16">
        <Breadcrumb />
      </div>
      <div className="flex flex-col space-y-16 justify-center items-center my-28">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[30px] md:text-[80px] lg:text-[110px] font-inter font-medium tracking-wider">
            404 Not Found
          </p>
          <p className="font-poppins text-[16px]">
            Your visited page not found. You may go home page.
          </p>
        </div>
        <Button text="Back to home page" href="/" />
      </div>
    </div>
  );
};

export default NotFound;
