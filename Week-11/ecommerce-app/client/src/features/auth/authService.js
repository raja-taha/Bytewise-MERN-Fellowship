import axios from "axios";

// Auth Service Functions

const login = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    user
  );
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/register`,
    user
  );
  return response.data;
};

const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}/users/profile`,
    userData,
    config
  );
  return response.data;
};

const deleteProfile = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(
    `${process.env.REACT_APP_API_URL}/users/profile/${userId}`, // Include userId in the URL
    config
  );
};

const authService = { login, register, updateProfile, deleteProfile };

export default authService;
