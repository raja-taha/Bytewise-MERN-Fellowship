// middleware/paymentMiddleware.js
const stripe = require("../utils/stripe");

const handlePayment = async (req, res, next) => {
  const { paymentDetails } = req.body;

  if (paymentDetails.method === "card") {
    try {
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(paymentDetails.totalPrice * 100), // Amount in cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
      });

      // Attach the payment intent ID to the request object
      req.paymentIntentId = paymentIntent.id;
      next(); // Proceed to the next middleware/handler
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({
        success: false,
        message: "Payment processing failed",
      });
    }
  } else {
    // For other payment methods (e.g., cash), just proceed
    next();
  }
};

module.exports = handlePayment;
