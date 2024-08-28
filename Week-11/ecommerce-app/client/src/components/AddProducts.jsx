import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    sales: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories`
        );
        setCategories(response.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        formData,
        config
      );

      toast.success("Product added successfully!");
      setProductData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        stock: "",
        sales: "",
        image: null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-[24px] font-poppins font-bold my-6 text-secondary2">
        Add Product
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-[80%]">
        <div>
          <label className="font-medium text-[18px]">Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <div>
          <label className="font-medium text-[18px]">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <div>
          <label className="font-medium text-[18px]">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <div>
          <label className="font-medium text-[18px]">Category:</label>
          <select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-400 rounded w-full"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-medium text-[18px]">Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <div>
          <label className="font-medium text-[18px]">Sales:</label>
          <input
            type="number"
            name="sales"
            value={productData.sales}
            onChange={handleInputChange}
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <div>
          <label className="font-medium text-[18px]">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="p-2 border border-gray-400 rounded w-full"
            required
          />
        </div>
        <div className="flex gap-10">
          <button
            type="submit"
            disabled={loading}
            className="my-3 bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
