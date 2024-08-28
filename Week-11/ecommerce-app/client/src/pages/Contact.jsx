import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import phoneIcon from "../assets/phoneIcon.png";
import emailIcon from "../assets/emailIcon.png";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        name,
        email,
        phone,
        message,
      });
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="my-10">
        <Breadcrumb />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-10 font-poppins">
        <div className=" md:w-1/3 p-5 md:p-10 border border-button border-opacity-30">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <img src={phoneIcon} alt="phone" />
              <h3 className="text-[16px] font-medium">Call To Us</h3>
            </div>
            <p className="text-[14px]">We are available 24/7, 7 days a week.</p>
            <p className="text-[14px]">
              Phone: <a href="tel:+923480105269">+923480105269</a>
            </p>
          </div>
          <hr className="mt-10 mb-10 opacity-30 text-button " />
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center ">
              <img src={emailIcon} alt="email" />
              <h3 className="text-[16px] font-medium">Write To Us</h3>
            </div>
            <p className="text-[14px]">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-[14px]">
              <a href="mailto:rajataha062@gmail.com">rajataha062@gmail.com</a>
            </p>
            <p className="text-[14px]">
              <a href="mailto:rmtaha062@gmail.com">rmtaha062@gmail.com</a>
            </p>
          </div>
        </div>
        <div className="md:w-2/3 p-5 md:p-10 border border-button border-opacity-30">
          <form className="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-secondary text-[16px] text-text2 rounded-md p-3 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary text-[16px] text-text2 rounded-md p-3 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Your Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-secondary text-[16px] text-text2 rounded-md p-3 focus:outline-none"
              />
            </div>
            <textarea
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="10"
              className="bg-secondary my-4 w-full text-[16px] text-text2 rounded-md p-3 focus:outline-none placeholder:absolute placeholder:top-3 placeholder:left-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className=" bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
