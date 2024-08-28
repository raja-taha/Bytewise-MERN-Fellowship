import React, { useState, useEffect } from "react";
import axios from "axios";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import tickIcon from "../assets/tickIcon.png";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories`
        );
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/categories/${id}`,
        config
      );
      setCategories(categories.filter((category) => category._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id) => {
    if (!editCategoryName) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/categories/${id}`,
        { name: editCategoryName },
        config
      );
      setCategories(
        categories.map((category) =>
          category._id === id ? response.data : category
        )
      );
      setEditCategoryId(null);
      setEditCategoryName("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (id, name) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center my-10">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-[24px] font-poppins font-bold my-6 text-secondary2">
        Categories
      </h2>
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <div>
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between bg-secondary text-[18px] text-text2 my-3 p-2 md:w-[80%]"
            >
              <div className="flex flex-col flex-1 gap-3">
                <p>
                  <span className="font-medium text-[20px]">Category ID: </span>
                  {category._id}
                </p>
                <p>
                  <span className="font-medium text-[20px]">
                    Category Name:{" "}
                  </span>
                  {editCategoryId === category._id ? (
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="p-2 border border-gray-400 rounded"
                    />
                  ) : (
                    category.name
                  )}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 mr-5">
                <button onClick={() => handleDelete(category._id)}>
                  <img src={deleteIcon} alt="delete" width={30} />
                </button>
                {editCategoryId === category._id ? (
                  <button onClick={() => handleUpdate(category._id)}>
                    <img src={tickIcon} alt="tick" width={30} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(category._id, category.name)}
                  >
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

export default ViewCategories;
