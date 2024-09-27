const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

const createReview = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const review = new Review(req.body);
  review.owner = req.user._id;
  product.reviews.push(review);
  await review.save();
  await product.save();
  res.status(200).json(review);
};
const deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  if (!deletedReview) {
    return next(new ExpressError(404, "Review not found"));
  }
  res.json({ message: "review deleted successfully", deletedReview });
};

module.exports = { createReview, deleteReview };
