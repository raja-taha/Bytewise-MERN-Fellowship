const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, customerDetails, orderItems, paymentDetails } = req.body;

    // If there's a paymentIntentId, include it in the order details
    const paymentIntentId = req.paymentIntentId || null;

    // Create a new order
    const newOrder = new Order({
      userId,
      customerDetails,
      orderItems,
      paymentDetails: {
        ...paymentDetails,
        paymentIntentId, // Save the paymentIntentId if available
      },
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Update stock and sales for each product in the order
    for (const item of orderItems) {
      const product = await Product.findById(item.id);
      if (product) {
        product.stock -= item.quantity; // Decrease stock by the ordered quantity
        product.sales += item.quantity; // Increase sales by the ordered quantity
        await product.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Controller function to get orders for the current user
exports.getUsersOrders = async (req, res) => {
  try {
    // Extract user ID from URL parameters
    const { userId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders for the user and populate orderItems.id
    const orders = await Order.find({ userId }).populate("orderItems.id");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId") // Populate user details
      .populate("orderItems.id"); // Populate product details for each order item

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("userId") // Populate user details
      .populate("orderItems.id"); // Populate product details for each order item

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the order and update it
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
