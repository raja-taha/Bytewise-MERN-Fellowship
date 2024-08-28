import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, reset } from "../features/auth/authSlice";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";
import { toast } from "react-toastify";

const Profile = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // Track which action needs confirmation
  const { user, isError, isSuccess, message, role } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const { firstName, lastName, email, phone, address } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      firstName === user?.firstName &&
      lastName === user?.lastName &&
      email === user?.email &&
      phone === user?.phone &&
      address === user?.address
    ) {
      toast.error("No changes detected.", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      dispatch(updateUser(formData));
    }
  };

  const handleDeleteAccount = () => {
    setConfirmAction(() => () => {
      dispatch(deleteUser(user._id));
      if (isError || isSuccess) {
        setTimeout(() => {
          dispatch(reset());
          navigate("/sign-up");
        }, 2000);
      }
    });
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
      });
    } else if (isSuccess) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className="w-[80%] mx-auto">
      <div className="mt-12">
        <Breadcrumb />
      </div>
      <div>
        <h2 className="text-[24px] font-poppins font-bold my-8">
          Welcome{" "}
          <span className="text-secondary2">{` ${user.firstName} ${user.lastName}`}</span>
          {role === "admin" && (
            <span className="text-[16px]">{` (${role})`}</span>
          )}
        </h2>
      </div>
      <div className="text-[20px] font-poppins text-secondary2 font-medium">
        <h3>Edit Your Profile</h3>
      </div>
      {user ? (
        <form onSubmit={handleUpdate} className="font-poppins text-[16px]">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex flex-col flex-1">
              <div className="flex flex-col mb-4">
                <label className="mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-3 w-full"
                />
              </div>
              <div className="flex flex-col mb-4 md:mb-0">
                <label className="mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-3 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex flex-col mb-4">
                <label className="mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-3 w-full"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-3 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              className="bg-secondary text-text2 focus:outline-secondary2 rounded-md p-3 w-full"
            />
          </div>

          <div className="flex flex-row justify-between items-center py-8 gap-4">
            <div className="flex gap-4">
              {role === "admin" ? (
                <Button text={"Dashboard"} href={"/admin/dashboard"} />
              ) : (
                <button onClick={handleDeleteAccount}>
                  <Button text={"Delete Account"} />
                </button>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className="bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>No user data available</p>
      )}

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Profile;
