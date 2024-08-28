import React, { useEffect, useState, useRef } from "react";
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
import { logout } from "../features/auth/authSlice";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false); // For account dropdown
  const [searchDropdown, setSearchDropdown] = useState(false); // For search dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const menuRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);

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
    handleCloseMenu(); // Close the menu
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
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-button md:h-[40px] flex justify-center items-center font-poppins py-2">
        <p className="text-text text-[14px] w-[80%] text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to={"/shop"}>
            <span className="text-text text-[14px] font-semibold underline ml-3">
              Shop Now
            </span>
          </Link>
        </p>
      </div>
      <header className="border-b-2 border-opacity-30 border-b-button h-[50px] md:h-[80px] flex items-center relative">
        <div className="w-[80%] mx-auto text-center md:flex justify-between items-center">
          <Link
            to={"/"}
            className="font-inter text-[24px] font-bold tracking-wide"
          >
            Exclusive
          </Link>
          <nav className="hidden md:flex justify-center items-center font-poppins text-[16px] space-x-10">
            <Link to={"/"} onClick={handleCloseMenu}>
              Home
            </Link>
            <Link to={"/contact"} onClick={handleCloseMenu}>
              Contact
            </Link>
            <Link to={"/about"} onClick={handleCloseMenu}>
              About
            </Link>
            <Link to={"/shop"} onClick={handleCloseMenu}>
              Shop
            </Link>
            {!user && (
              <Link to={"/login"} onClick={handleCloseMenu}>
                Login
              </Link>
            )}
            <div className="flex space-x-3 items-center relative">
              <form
                onSubmit={(e) => e.preventDefault()} // Prevent form submission
                className="bg-secondary flex items-center py-2 px-3 rounded-sm"
              >
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-secondary w-[180px] text-[13px] text-text2 h-full focus:outline-none"
                />
                <button type="submit" className="pl-2">
                  <img src={searchIcon} alt="search" />
                </button>
              </form>
              {searchDropdown && (
                <div
                  ref={searchDropdownRef}
                  className="absolute top-full z-10 mt-2 w-[250px] bg-button bg-opacity-60 backdrop-blur-md py-3 rounded-md"
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
              {user && (
                <div className="relative flex space-x-3 items-center">
                  <Link to={"/user/wishlist"} onClick={handleCloseMenu}>
                    <img src={wishlist} alt="wishlist" />
                  </Link>
                  <Link to={"/user/cart"} onClick={handleCloseMenu}>
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
                      className="absolute z-10 right-0 top-full mt-2 w-[250px] bg-button bg-opacity-60 backdrop-blur-md py-3 rounded-md"
                    >
                      <Link
                        to={"/user/profile"}
                        onClick={handleCloseMenu}
                        className="flex items-center text-text p-2 hover:bg-opacity-70"
                      >
                        <img src={accountWhite} alt="profile" width={30} />
                        <span className="ml-2">Manage My Account</span>
                      </Link>
                      <Link
                        to={"/user/orders"}
                        onClick={handleCloseMenu}
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
          </nav>
          <nav
            className={`md:hidden absolute top-0 left-0 font-poppins text-[16px] ${
              menuOpen ? "w-[70%] z-10" : ""
            }`}
          >
            <div className="flex justify-between items-center p-4">
              <button onClick={handleMenuToggle}>
                <img src={menuOpen ? menuCloseIcon : menuIcon} alt="menu" />
              </button>
            </div>

            {menuOpen && (
              <div
                ref={menuRef}
                className={`z-10 w-[100%] border-2 border-button border-opacity-30 shadow-md bg-primary p-4 flex flex-col ${
                  menuOpen ? "mx-5" : ""
                }`}
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
                    className="absolute z-10 top-32 left-10 mb-4 w-full bg-button bg-opacity-60 backdrop-blur-md py-3 rounded-md"
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

                <div className="flex flex-col">
                  <div className="flex flex-col space-y-2 justify-center items-center">
                    <Link
                      to={"/"}
                      className="w-fit px-4 "
                      onClick={handleCloseMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to={"/contact"}
                      className="w-fit px-4 "
                      onClick={handleCloseMenu}
                    >
                      Contact
                    </Link>
                    <Link
                      to={"/about"}
                      className="w-fit px-4 "
                      onClick={handleCloseMenu}
                    >
                      About
                    </Link>
                    <Link
                      to={"/shop"}
                      className="w-fit px-4 "
                      onClick={handleCloseMenu}
                    >
                      Shop
                    </Link>
                    {!user && (
                      <Link
                        to={"/login"}
                        className="w-fit px-4 "
                        onClick={handleCloseMenu}
                      >
                        Login
                      </Link>
                    )}
                  </div>

                  {user && (
                    <div className="relative flex justify-center space-x-4 py-5">
                      <Link to={"/user/wishlist"} onClick={handleCloseMenu}>
                        <img src={wishlist} alt="wishlist" />
                      </Link>
                      <Link to={"/user/cart"} onClick={handleCloseMenu}>
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
                            onClick={handleCloseMenu}
                            className="flex items-center text-text p-2 hover:bg-opacity-70"
                          >
                            <img src={accountWhite} alt="profile" width={30} />
                            <span className="ml-2">Manage My Account</span>
                          </Link>
                          <Link
                            to={"/user/orders"}
                            onClick={handleCloseMenu}
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
        </div>
      </header>
    </>
  );
};

export default Header;
