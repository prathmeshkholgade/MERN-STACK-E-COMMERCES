const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: String, required: true },
        totalprice: { type: Number, required: true },
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "netbanking"],
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    isPaymentPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Delivered", "Cancelled", "Returned"],
    },
    paymentInfo: {
      razorpayPaymentId: { type: String, default: null }, // Default to null
      razorpayOrderId: { type: String, default: null }, // Default to null
      razorpaySignature: { type: String, default: null }, // Default to null
    },
    deliveredAt: {
      type: Date,
      default: null, // Default to null until delivered
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
