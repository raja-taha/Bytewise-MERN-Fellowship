import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpPicture from "../assets/signUpPicture.png";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message); // Display error toast
    }

    if (isSuccess && user) {
      toast.success(message); // Display success toast
      setTimeout(() => {
        navigate("/");
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
            alt="login"
            className="rounded-sm md:w-[400px] lg:w-[700px]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="md:w-[65%] mx-auto my-5">
            <h1 className="text-[36px] font-inter font-medium mb-3">
              Log in to Exclusive
            </h1>
            <p className="text-[16px] font-poppins mb-10">
              Enter your details below
            </p>
            <form onSubmit={handleSubmit} className="text-[16px] font-poppins">
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
                Log In
              </button>
            </form>
            <p className="text-[16px] font-poppins text-center">
              Don't have an account?{" "}
              <span>
                <Link to={"/sign-up"} className="underline font-medium">
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
