import axios from "axios";

const login = async (user) => {
  const response = await axios.post("/users/login", user);
  return response.data;
};

const register = async (user) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post("/users/create", user, config);
  return response.data;
};

const authService = { login, register };

export default authService;
