import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoutes = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "user" || role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default UserRoutes;
