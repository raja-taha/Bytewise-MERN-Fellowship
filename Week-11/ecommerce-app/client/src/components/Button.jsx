import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, href }) => {
  return (
    <Link
      to={href}
      className="bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
    >
      {text}
    </Link>
  );
};

export default Button;
