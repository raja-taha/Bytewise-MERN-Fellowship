const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Your Stripe secret key

module.exports = stripe;
