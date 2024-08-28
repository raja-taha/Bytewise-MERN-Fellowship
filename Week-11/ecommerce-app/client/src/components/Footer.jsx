import React, { useState } from "react"; // Import useState
import axios from "axios"; // Import axios for HTTP requests
import copyrightIcon from "../assets/copyrightIcon.png";
import qrcode from "../assets/qrcode.png";
import playStore from "../assets/playStore.png";
import appStore from "../assets/appStore.png";
import facebookIcon from "../assets/facebookIcon.png";
import instagramIcon from "../assets/instagramIcon.png";
import twitterIcon from "../assets/twitterIcon.png";
import linkedinIcon from "../assets/linkedinIcon.png";
import sendIcon from "../assets/sendIcon.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to your backend API
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/subscribe`,
        { email }
      );

      // Handle successful response
      if (response.status === 200) {
        toast.success("Subscribed successfully!");
        setEmail(""); // Clear the input field
      }
    } catch (error) {
      // Check if the error response has a specific message
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    }
  };

  return (
    <footer className="bg-button ">
      <div className=" w-[80%] mx-auto pt-20 ">
        <div className="flex flex-col md:flex-row md:justify-between font-poppins text-text text-[16px]">
          <div className="flex flex-col gap-3">
            <h2 className="font-inter text-[24px] font-bold mb-6">Exclusive</h2>
            <h3 className="text-[20px] font-medium mb-3">Subscribe</h3>
            <p>Get 10% off your first order</p>
            <form
              className="border-2 border-text flex justify-around items-center py-2 rounded-sm"
              onSubmit={handleSubscribe} // Handle form submission
            >
              <input
                type="text"
                placeholder="Enter your email"
                required
                className="bg-button mx-2 w-[150px] text-[13px] h-full focus:outline-none"
                value={email} // Bind state to input
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
              <button type="submit" className="bg-button pr-4">
                <img src={sendIcon} alt="send" />
              </button>
            </form>
          </div>
          <hr className="md:hidden my-10  text-text " />
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-medium mb-6">Support</h3>
            <p className="mb-2">
              <a
                href="https://www.google.com/maps/place/Satellite+Town,+Rawalpindi,+Punjab/data=!4m2!3m1!1s0x38df94df4757096d:0x4a21728543b52192?sa=X&ved=1t:242&ictx=111"
                target="_blank"
                rel="noreferrer"
              >
                Satellite Town, Rawalpindi, Pakistan
              </a>
            </p>
            <p className="mb-2">
              <a href="mailto:rajataha062@gmail.com">rajataha062@gmail.com</a>
            </p>
            <p>
              <a href="tel:+923480105269">+92-348-0105269</a>
            </p>
          </div>
          <hr className="md:hidden my-10  text-text " />
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-medium mb-6">Account</h3>
            <div className=" flex flex-col">
              <Link to={"/user/profile"} className="mb-3">
                My Account
              </Link>
              <Link to={"/login"} className="mb-3">
                Login
              </Link>
              <Link to={"/user/cart"} className="mb-3">
                Cart
              </Link>
              <Link to={"/user/wishlist"} className="mb-3">
                Wishlist
              </Link>
              <Link to={"/shop"} className="mb-3">
                Shop
              </Link>
            </div>
          </div>
          <hr className="md:hidden my-10  text-text " />
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-medium mb-6">Quick Links</h3>
            <div className=" flex flex-col">
              <Link to={"/privacy-policy"} className="mb-3">
                Privacy Policy
              </Link>
              <Link to={"/terms-of-use"} className="mb-3">
                Terms of Use
              </Link>
              <Link to={"/faq"} className="mb-3">
                FAQ
              </Link>
              <Link to={"/contact"} className="mb-3">
                Contact
              </Link>
            </div>
          </div>
          <hr className="md:hidden my-10  text-text " />
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-medium mb-6">Download App</h3>
            <p className="text-[16px] md:text-[11px]">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-2 mt-2 ">
              <img src={qrcode} alt="qrcode" />
              <div className="flex flex-col gap-2">
                <img src={playStore} alt="play store" />
                <img src={appStore} alt="app store" />
              </div>
            </div>
            <div className="flex gap-8 mt-3 justify-center ">
              <a
                href="https://www.facebook.com/rajataha062"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebookIcon} alt="facebook" />
              </a>
              <a
                href="https://www.x.com/EnggRajaTaha"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterIcon} alt="twitter" />
              </a>
              <a
                href="https://www.instagram.com/raja_taha_20"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagramIcon} alt="instagram" />
              </a>
              <a
                href="http://linkedin.com/in/raja-taha"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinIcon} alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center font-poppins text-[16px] text-primary pt-20 pb-10">
          <img src={copyrightIcon} alt="copyright" className="mr-2 w-4" />
          <p>Copyright Taha 2024. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
