const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getUsersOrders,
} = require("../controllers/orderController"); // Adjust the path to your controller
const handlePayment = require("../middleware/paymentMiddleware");

// Create a new order
router.post("/", handlePayment, createOrder);

// Get all orders
router.get("/", getAllOrders);

router.get("/user/:userId", getUsersOrders);

// Get an order by ID
router.get("/:id", getOrderById);

// Update an order by ID
router.put("/:id", updateOrder);

// Delete an order by ID
router.delete("/:id", deleteOrder);

module.exports = router;
