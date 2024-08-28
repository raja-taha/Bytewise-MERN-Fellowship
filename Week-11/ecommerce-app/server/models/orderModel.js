const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerDetails: {
      firstName: { type: String, required: true },
      companyName: { type: String },
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      emailAddress: { type: String, required: true },
    },
    orderItems: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    paymentDetails: {
      method: { type: String, enum: ["cash", "card"], required: true },
      cardDetails: {
        nameOnCard: { type: String },
        cardNumber: { type: String },
        expiryDate: { type: String },
        cvc: { type: String },
      },
      totalPrice: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
