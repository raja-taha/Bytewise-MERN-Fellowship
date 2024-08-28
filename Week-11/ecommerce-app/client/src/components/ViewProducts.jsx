import React, { useState, useEffect } from "react";
import axios from "axios";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import tickIcon from "../assets/tickIcon.png";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    sales: "",
    image: null,
  });

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/products`),
          axios.get(`${process.env.REACT_APP_API_URL}/categories`),
        ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        config
      );
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id) => {
    if (!editProductData.name) return;

    try {
      const formData = new FormData();
      for (const key in editProductData) {
        formData.append(key, editProductData[key]);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        formData,
        config
      );

      setProducts(
        products.map((product) =>
          product._id === id ? response.data : product
        )
      );
      setEditProductId(null);
      setEditProductData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        stock: "",
        sales: "",
        image: null,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category._id,
      stock: product.stock,
      sales: product.sales,
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setEditProductData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center ml-10">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-[24px] font-poppins font-bold mt-6 mb-2 text-secondary2">
        Products
      </h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col justify-between bg-secondary text-[18px] text-text2 my-1 p-5  rounded-lg"
            >
              <div className="flex flex-col flex-1 gap-3">
                <p>
                  <span className="font-medium text-[20px]">Product ID: </span>
                  {product._id}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Name: </span>
                  {editProductId === product._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editProductData.name}
                      onChange={handleInputChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    />
                  ) : (
                    product.name
                  )}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Description: </span>
                  {editProductId === product._id ? (
                    <textarea
                      name="description"
                      value={editProductData.description}
                      onChange={handleInputChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    />
                  ) : (
                    product.description
                  )}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Price: </span>
                  {editProductId === product._id ? (
                    <input
                      type="number"
                      name="price"
                      value={editProductData.price}
                      onChange={handleInputChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    />
                  ) : (
                    product.price
                  )}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Category: </span>
                  {editProductId === product._id ? (
                    <select
                      name="categoryId"
                      value={editProductData.categoryId}
                      onChange={handleInputChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    product.category.name
                  )}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Stock: </span>
                  {editProductId === product._id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editProductData.stock}
                      onChange={handleInputChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    />
                  ) : (
                    product.stock
                  )}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Sales: </span>
                  {editProductId === product._id ? (
                    <input
                      type="number"
                      name="sales"
                      value={editProductData.sales}
                      onChange={handleInputChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    />
                  ) : (
                    product.sales
                  )}
                </p>
                <p>
                  <span className="font-medium text-[20px]">Image: </span>
                  {editProductId === product._id ? (
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-2 shadow appearance-none border w-full leading-tight focus:shadow-outline"
                    />
                  ) : (
                    <img
                      src={product.image.url}
                      alt={product.name}
                      className="w-[200px] object-cover border-2 border-button border-opacity-50 mt-2 p-3 rounded-lg"
                    />
                  )}
                </p>
              </div>
              <div className="flex justify-center items-center gap-3 mr-5 mt-5">
                <button onClick={() => handleDelete(product._id)}>
                  <img src={deleteIcon} alt="delete" width={30} />
                </button>
                {editProductId === product._id ? (
                  <button onClick={() => handleUpdate(product._id)}>
                    <img src={tickIcon} alt="tick" width={30} />
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(product)}>
                    <img src={editIcon} alt="edit" width={30} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
