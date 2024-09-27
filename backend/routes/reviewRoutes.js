const express = require("express");
const { isLoggedIn } = require("../middleware/middlerware");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const ExpressError = require("../utils/ExpressError");
const { createReview, deleteReview } = require("../controller/reviewontroller");
const router = express.Router();

router.post("/:id", isLoggedIn, wrapAsync(createReview));
router.delete("/:id/:reviewId", isLoggedIn, wrapAsync(deleteReview));

module.exports = router;
