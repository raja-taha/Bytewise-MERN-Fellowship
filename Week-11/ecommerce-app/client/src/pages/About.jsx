import React from "react";
import Features from "../components/Features";
import aboutImage from "../assets/aboutImage.jpg";

const About = () => {
  return (
    <div className="w-[80%] mx-auto">
      <div>
        <div className="flex flex-col md:flex-row my-10 md:my-0">
          <div className="md:w-1/2 flex flex-1 flex-col justify-center items-center">
            <div className="md:w-[80%] text-justify">
              <h1 className="text-[54px] font-inter font-semibold mb-3">
                Our Story
              </h1>
              <p className="text-[16px] font-poppins mb-10">
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>
              <p className="text-[16px] font-poppins mb-10">
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 my-10 md:my-20">
            <img
              src={aboutImage}
              alt="login"
              className="rounded-sm w-full md:w-[400px] lg:w-[700px]"
            />
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
};

export default About;
