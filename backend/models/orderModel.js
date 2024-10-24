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
      // type: Schema.Types.ObjectId,
      // ref: "Address",
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        city: { type: String, required: true },
        email: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        number: { type: String, required: true },
        alternateNumber: { type: String, required: true },
        landmark: { type: String, required: true },
        address: { type: String, required: true },
        addressId: { type: String, required: true },
        user: { type: String, required: true },
      },
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
