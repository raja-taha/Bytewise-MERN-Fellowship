import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ConfirmationModal from "./components/ConfirmationModal.js";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = (product, quantity) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.name === product.name
    );
    if (quantity <= 0) {
      return;
    }

    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const removeFromCart = (productName) => {
    setCartItems(cartItems.filter((item) => item.name !== productName));
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    setCartItems([]); // Clear the cart after confirmation
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="m-5 font-red-hat-text md:flex">
        <div className="md:w-2/3">
          <ProductList addToCart={addToCart} />
        </div>
        <div className="md:w-1/3">
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            onConfirmOrder={handleConfirmOrder}
          />
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          cartItems={cartItems}
          onConfirm={handleConfirmModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
