import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";

import { useDispatch } from "react-redux";
import { setUser, setRole } from "./features/auth/authSlice";
import { useEffect } from "react";
import Unauthorized from "./pages/Unauthorized";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import CategoryPage from "./pages/CategoryPage";
import Shop from "./pages/Shop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/Orders";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      dispatch(setRole(storedRole));
    }
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2000} // Duration in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        pauseOnFocusLos
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/user" element={<UserRoutes />}>
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="billing" element={<Billing />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
