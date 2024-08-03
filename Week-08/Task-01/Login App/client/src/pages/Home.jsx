import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../features/users/userSlice";
import { logout } from "../features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{message}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              User Profile
            </h1>
            {user.image && (
              <img
                src={`http://localhost:5000/${user.image}`} // Adjust URL based on your server configuration
                alt="Profile"
                className="w-36 h-36 rounded-full mx-auto mb-4"
              />
            )}
            <div className="mb-4">
              <p className="text-gray-700">
                <strong className="font-bold">ID:</strong> {user.id}
              </p>
              <p className="text-gray-700">
                <strong className="font-bold">Username:</strong> {user.username}
              </p>
              <p className="text-gray-700">
                <strong className="font-bold">Email:</strong> {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-700">No user data available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
