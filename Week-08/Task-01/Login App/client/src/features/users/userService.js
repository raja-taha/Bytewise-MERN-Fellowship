// userService.js
import axios from "axios";

const getUser = async () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  const response = await axios.get("/users/read", {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in Authorization header
    },
  });

  return response.data;
};

const userService = { getUser };

export default userService;
