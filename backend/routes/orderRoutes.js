const express = require("express");
const Razorpay = require("razorpay");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const crypto = require("crypto");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
router.post(
  "/payment",
  wrapAsync(async (req, res, next) => {
    const { amount, products, userId, shhippingAddress, totalQuantity } =
      req.body;
    console.log(req.body);
    const options = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    const newOrder = new Order({
      user: userId,
      orderItems: products,
      totalPrice: amount,
      shippingAddress: {
        firstName: shhippingAddress.fristName,
        landmark: shhippingAddress.landmark,
        lastName: shhippingAddress.lastName,
        address: shhippingAddress.address,
        city: shhippingAddress.city,
        state: shhippingAddress.state,
        zipCode: shhippingAddress.zipCode,
        email: shhippingAddress.email,
        addressId: shhippingAddress._id,
        user: shhippingAddress.user,
        number: shhippingAddress.number,
        alternateNumber: shhippingAddress.alternateNumber,
      },
      totalQuantity: totalQuantity,
      paymentInfo: {
        razorpayOrderId: order.id,
      },
      paymentMethod: "netbanking",
    });
    const result = await newOrder.save();
    console.log(result);
    console.log(order);
    res.status(200).json({ order });
  })
);

const addOrderToTheUser = async (userId, orderId) => {
  const user = await User.findById(userId);
  user.orders.push(orderId);
  await user.save();
};

router.post(
  "/payment/verification",
  wrapAsync(async (req, res, next) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      // orderDetails,
    } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthenticated = expectedSignature === razorpay_signature;

    const order = await Order.findOne({
      "paymentInfo.razorpayOrderId": razorpay_order_id,
    });

    if (isAuthenticated) {
      order.paymentInfo.razorpayPaymentId = razorpay_payment_id;
      order.paymentInfo.razorpaySignature = razorpay_signature;
      order.isPaymentPaid = true;
      order.paidAt = new Date();

      await order.save(); // Save the updated order details
      console.log("this is that that which is found in updated db", order);
      addOrderToTheUser(req.user._id, order._id);

      console.log("payment verifyed successfully");
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }

    console.log(expectedSignature);
    console.log(req.body);
  })
);
router.put(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const { status } = req.body;
    console.log(req.body);
    const order = await Order.findById(id);
    console.log(order);
    order.orderStatus = status;
    await order.save();
  })
);
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const order = await Order.findById(id)
      .populate("shippingAddress")
      .populate("orderItems.product")
      .populate("user");
    if (!order) {
      return next(new ExpressError(404, "order not found"));
    }
    res.status(200).json(order);
  })
);
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const orders = await Order.find()
      .populate("shippingAddress")
      .populate("orderItems.product")
      .populate("user");
    if (!orders) {
      return next(new ExpressError(404, "order not found"));
    }
    res.status(200).json(orders);
  })
);
module.exports = router;
