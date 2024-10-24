const Product = require("../models/productModel");
const ExpressError = require("../utils/ExpressError");
const Cart = require("../models/cartModel");
const { json } = require("express");

const addToCart = async (req, res, next) => {
  console.log(req.body);
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ExpressError(404, "product not found"));
  }
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity: quantity || 1 }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity
        ? quantity
        : (cart.items[itemIndex].quantity += 1);
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }
  }
  await cart.save();
  res.send(cart);
};

const deleteFormCart = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user._id;
  console.log("this is user id which is logged in ", userId);
  let cart = await Cart.findOne({ user: userId });
  if (cart && cart?.user.toString() !== userId.toString()) {
    console.log(cart?.user, "", userId);
    return next(new ExpressError(500, "you are not owner of this listing"));
  }
  console.log("this is user who create this cart", cart?.user);
  if (!cart) {
    return next(new ExpressError(403, "cart not found"));
  }
  const productIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (productIndex > -1) {
    cart.items.splice(productIndex, 1);
  } else {
    return next(new ExpressError(404, "Product not found in cart"));
  }
  // If the cart is now empty, delete the cart
  if (cart.items.length === 0) {
    await Cart.findByIdAndDelete(cart._id); // Delete the entire cart
    return res
      .status(200)
      .json({ message: "Cart was empty and has been deleted" });
  }
  await cart.save();
  console.log(productIndex);
  res.json({ message: "cart item deleted", cart });
};

const updateQuantityOfCart = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id;
  let carts = await Cart.findOne({ user: userId });
  // Find the product in the cart
  let productFound = false;
  carts.items.forEach((product) => {
    if (product.product.toString() === productId) {
      product.quantity = quantity; // Update the quantity
      productFound = true; // Mark the product as found
    }
  });
  // If the product was not found, return an error
  if (!productFound) {
    return next(new ExpressError(404, "Product not found in cart"));
  }
  await carts.save();
  res.status(200).json({ carts });
};

const fetchCurrUserCart = async (req, res, next) => {
  const userId = req.user._id;
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    return next(new ExpressError(400, "no product found"));
  }
  res.status(200).json(cart);
};

module.exports = {
  addToCart,
  deleteFormCart,
  fetchCurrUserCart,
  updateQuantityOfCart,
};
