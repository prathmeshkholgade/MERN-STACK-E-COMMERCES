const express = require("express");
const Razorpay = require("razorpay");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const crypto = require("crypto");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
router.post(
  "/payment",
  wrapAsync(async (req, res, next) => {
    const { amount } = req.body;
    console.log(req.body);
    const options = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({ order });
  })
);
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
    if (isAuthenticated) {
      console.log("payment verifyed successfully");
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }

    console.log(expectedSignature);
    console.log(req.body);
  })
);
module.exports = router;
// const generated_signature = hmac_sha256(
//   razorpay_order_id + "|" + razorpay_payment_id,
//   process.env.RAZORPAY_SECRET
// );

// if (generated_signature == razorpay_signature) {
//   console.log("  payment is successful");
// }

// const {
//   validatePaymentVerification,
//   validateWebhookSignature,
// } = require("./dist/utils/razorpay-utils");
// validatePaymentVerification(
//   { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
//   generated_signature,
//   process.env.RAZORPAY_SECRET
// );
