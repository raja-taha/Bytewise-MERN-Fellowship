import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cart from "../assets/cartIcon.png";
import account from "../assets/userIcon.png";
import accountWhite from "../assets/userIconWhite.png";
import wishlist from "../assets/wishlistIcon.png";
import searchIcon from "../assets/searchIcon.png";
import logoutIcon from "../assets/logoutIcon.png";
import menuIcon from "../assets/menuIcon.png";
import menuCloseIcon from "../assets/menuCloseIcon.png";
import axios from "axios";
import { logout } from "../features/auth/authSlice";

const MobileNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false); // For account dropdown
  const [searchDropdown, setSearchDropdown] = useState(false); // For search dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const menuRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);

  useEffect(() => {
    setDropdown(false);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchDropdown(false);
      }
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleProfile = () => {
    setDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setSearchDropdown(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/search`,
        { params: { query } }
      );
      setSearchResults(response.data);
      setSearchDropdown(response.data.length > 0);
    } catch (err) {
      console.error("Failed to search products:", err.message);
      setSearchDropdown(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchDropdown(false);
  };

  return (
    <nav className="font-poppins text-[16px] bg-primary w-full">
      <div className="flex justify-between items-center p-4">
        <button onClick={handleMenuToggle}>
          <img src={menuOpen ? menuCloseIcon : menuIcon} alt="menu" />
        </button>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-0 left-0 z-20 w-[100%] h-screen bg-primary p-4 flex flex-col"
        >
          <div className="flex items-center mb-4">
            <form
              onSubmit={(e) => e.preventDefault()} // Prevent form submission
              className="bg-secondary flex items-center py-2 px-3 rounded-sm w-full"
            >
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-secondary w-full text-[13px] text-text2 h-full focus:outline-none"
              />
              <button type="submit" className="pl-2">
                <img src={searchIcon} alt="search" />
              </button>
            </form>
          </div>

          {searchDropdown && (
            <div
              ref={searchDropdownRef}
              className="mb-4 w-full bg-button bg-opacity-60 backdrop-blur-md py-3 rounded-md"
            >
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center text-text p-2 hover:bg-opacity-70 cursor-pointer"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <span>{product.name}</span>
                  </div>
                ))
              ) : (
                <div className="text-text p-2">No results found</div>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <Link to={"/"} className="text-text">
              Home
            </Link>
            <Link to={"/contact"} className="text-text">
              Contact
            </Link>
            <Link to={"/about"} className="text-text">
              About
            </Link>
            <Link to={"/shop"} className="text-text">
              Shop
            </Link>
            {!user && (
              <Link to={"/login"} className="text-text">
                Login
              </Link>
            )}

            {user && (
              <div className="relative">
                <Link to={"/user/wishlist"}>
                  <img src={wishlist} alt="wishlist" />
                </Link>
                <Link to={"/user/cart"}>
                  <img src={cart} alt="cart" />
                </Link>
                <button
                  onClick={handleProfile}
                  aria-expanded={dropdown}
                  aria-controls="account-dropdown-menu"
                >
                  <img src={account} alt="account" />
                </button>
                {dropdown && (
                  <div
                    ref={accountDropdownRef}
                    id="account-dropdown-menu"
                    className="absolute z-10 top-full left-0 mt-2 w-full bg-button bg-opacity-60 backdrop-blur-md py-3 rounded-md"
                  >
                    <Link
                      to={"/user/profile"}
                      className="flex items-center text-text p-2 hover:bg-opacity-70"
                    >
                      <img src={accountWhite} alt="profile" width={30} />
                      <span className="ml-2">Manage My Account</span>
                    </Link>
                    <Link
                      to={"/user/orders"}
                      className="flex items-center text-text p-2 hover:bg-opacity-70"
                    >
                      <img src={accountWhite} alt="profile" width={30} />
                      <span className="ml-2">My Orders</span>
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className="flex items-center text-text p-2 hover:bg-opacity-70"
                    >
                      <img src={logoutIcon} alt="logout" width={30} />
                      <span className="ml-2">Logout</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
