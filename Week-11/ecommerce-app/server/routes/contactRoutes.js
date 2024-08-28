const Contact = require("../models/contactModel");
const express = require("express");
const router = express.Router();

// POST route to handle contact form submission
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    message,
  });

  try {
    await newContact.save();
    res.status(200).json({ message: "Contact message saved successfully." });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to save contact message." });
  }
});

module.exports = router;
