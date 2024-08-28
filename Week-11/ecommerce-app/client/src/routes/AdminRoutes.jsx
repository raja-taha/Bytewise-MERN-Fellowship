import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default AdminRoutes;
