const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const ExpressError = require("../utils/ExpressError");

const createReview = async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const deliveredOrder = await Order.findOne({
    user: userId,
    "orderItems.product": productId,
    orderStatus: "Delivered",
  });
  console.log(deliveredOrder);
  if (!deliveredOrder) {
    return next(
      new ExpressError(
        403,
        "Only users who have received the product can post a review."
      )
    );
  }
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ExpressError(404, "Product not Found"));
  }
  const review = new Review(req.body);
  review.owner = req.user._id;
  product.reviews.push(review);
  await review.save();
  await product.save();
  res.status(200).json(review);
};
const deleteReview = async (req, res, next) => {
  console.log(req.params);
  const { id, reviewId } = req.params;
  await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  if (!deletedReview) {
    return next(new ExpressError(404, "Review not found"));
  }
  res.json({ message: "review deleted successfully", deletedReview });
};

module.exports = { createReview, deleteReview };
