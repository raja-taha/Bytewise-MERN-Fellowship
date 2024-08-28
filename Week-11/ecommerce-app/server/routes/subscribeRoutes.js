const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriberModel"); // Adjust the path as necessary
const nodemailer = require("nodemailer");

// Set up your email transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like 'SendGrid', 'Mailgun', etc.
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.PASS, // Replace with your email password or app password
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).send({ message: "Email already subscribed" });
    }

    // Save to MongoDB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Subscription Confirmation",
      text: "Thank you for subscribing to our newsletter!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Send a specific error message
        return res.status(500).send({
          message: "Subscription successful, but email failed to send.",
        });
      }
      console.log("Email sent:", info.response);
      // Indicate success
      res.status(200).send({ message: "Subscription successful!" });
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
