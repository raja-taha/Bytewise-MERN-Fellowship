const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const cloudinary = require("../utils/cloudinaryConfig");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, stock } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      name,
      description,
      price,
      image: { url: result.secure_url, public_id: result.public_id },
      category,
      stock,
      sales: 0,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    // Validate the query parameter
    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ message: "Query parameter is required and cannot be empty" });
    }

    // Search for products with a case-insensitive regex
    const products = await Product.find({
      name: { $regex: new RegExp(query, "i") }, // Using RegExp constructor
    }).populate("category"); // Populate if needed

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: err.message });
  }
};

// Get products by category ID
const getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params; // Get the category ID from the request parameters

  try {
    // Find products where the category field matches the category ID
    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

module.exports = {
  getProductsByCategoryId,
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, stock, sales } = req.body;

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    // Update image if a new one is uploaded
    if (req.file) {
      // Delete the previous image from Cloudinary
      await cloudinary.uploader.destroy(product.image.public_id);

      // Upload the new image
      const result = await cloudinary.uploader.upload(req.file.path);
      product.image = { url: result.secure_url, public_id: result.public_id };
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.sales = sales || product.sales;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  searchProducts,
};
