const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const subscribeRoute = require("./routes/subscribeRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

dotenv.config();

/// CORS configuration to allow all origins
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (optional, can be set to false if not needed)
  })
);

// Handling preflight requests
app.options("*", cors()); // Enable pre-flight across-the-board

// Your routes and server setup
app.get("/", (req, res) => {
  res.send("CORS is enabled for all origins!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/subscribe", subscribeRoute);
app.use("/contact", contactRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
