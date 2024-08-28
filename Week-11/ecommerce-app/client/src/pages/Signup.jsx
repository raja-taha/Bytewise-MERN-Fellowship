import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpPicture from "../assets/signUpPicture.png";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });

  const { firstName, lastName, phone, email, address, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(register(formData));

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div>
      <div className="w-[80%] m-auto flex flex-col md:flex-row my-10">
        <div>
          <img
            src={signUpPicture}
            alt="signup"
            width={700}
            className="rounded-sm"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="md:w-[65%] mx-auto">
            <h1 className="text-[36px] font-inter font-medium mb-3">
              Create an account
            </h1>
            <p className="text-[16px] font-poppins mb-10">
              Enter your details below
            </p>
            <form onSubmit={handleSubmit} className="text-[16px] font-poppins">
              <div className="border-b-2 border-opacity-30 border-b-button focus-within:border-opacity-80 mb-5">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="focus:outline-none w-full"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="border-b-2 border-opacity-30 border-b-button focus-within:border-opacity-80 mb-5">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="focus:outline-none w-full"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 border-opacity-30 border-b-button focus-within:border-opacity-80 mb-5">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  className="focus:outline-none w-full"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 border-opacity-30 border-b-button focus-within:border-opacity-80 mb-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="focus:outline-none w-full"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 border-opacity-30 border-b-button focus-within:border-opacity-80 mb-5">
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  className="focus:outline-none w-full"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 border-opacity-30 border-b-button focus-within:border-opacity-80 mb-10">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="focus:outline-none w-full"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm w-full hover:bg-hoverButton my-5"
              >
                Register
              </button>
            </form>
            <p className="text-[16px] font-poppins text-center">
              Already have an account?{" "}
              <span>
                <Link to={"/login"} className="underline font-medium">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
