const express = require("express");
const { isLoggedIn } = require("../middleware/middlerware");
const Product = require("../models/productModel");
const ExpressError = require("../utils/ExpressError");
const Cart = require("../models/cartModel");
const wrapAsync = require("../utils/wrapAsync");
const { deleteFormCart, addToCart } = require("../controller/cartController");
const router = express.Router();

router.post("/", isLoggedIn, wrapAsync(addToCart));
router.delete("/:productId", isLoggedIn, wrapAsync(deleteFormCart));

module.exports = router;
