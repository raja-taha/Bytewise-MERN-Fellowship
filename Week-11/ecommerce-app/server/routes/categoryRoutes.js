const express = require("express");
const adminCheck = require("../middleware/adminCheck");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminCheck, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", protect, adminCheck, updateCategory);
router.delete("/:id", protect, adminCheck, deleteCategory);

module.exports = router;
