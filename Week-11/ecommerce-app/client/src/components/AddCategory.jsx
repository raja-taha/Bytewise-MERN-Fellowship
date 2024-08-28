import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/categories`,
        { name: categoryName },
        config
      );

      toast.success(`Category '${response.data.name}' added successfully!`);
      setCategoryName(""); // Reset the input field
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="add-category">
      <h2 className="text-[24px] font-poppins font-bold my-6 text-secondary2">
        Add New Category
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-[18px] font-semibold mb-2"
            htmlFor="categoryName"
          >
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="my-3 bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
