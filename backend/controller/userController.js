const { model } = require("mongoose");
const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");

const login = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("addresses")
    .populate("orders")
    .populate({
      path: "orders",
      populate: { path: "orderItems.product", model: "Product" },
    });
  const { hash, salt, ...userWithOutSesitiveInfo } = user.toObject();
  res.status(200).json({ user: userWithOutSesitiveInfo });
};

const signup = async (req, res, next) => {
  const { password, ...other } = req.body;
  const newUser = new User(other);
  const registerUser = await User.register(newUser, password);
  req.login(registerUser, async (err) => {
    if (err) {
      return next(err);
    }
    const populatedUser = await User.findById(registerUser._id)
      .populate("addresses")
      .populate({
        path: "orders",
        populate: { path: "orderItems.product", model: "Product" },
      });

    const { hash, salt, ...userWithOutSesitiveInfo } = populatedUser.toObject();
    res.status(201).json({ user: userWithOutSesitiveInfo });
  });
};
const logOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.send("you are logOut now");
  });
};
const getUserData = async (req, res, next) => {
  try {
    console.log("user:which currently logged in", req.user);
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user._id)
        .populate("addresses")
        .populate({
          path: "orders",
          populate: { path: "orderItems.product", model: "Product" },
        });
      return res.status(200).json({ user: user });
    } else {
      next(new ExpressError(401, "user is not authenticate"));
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { login, signup, logOut, getUserData };
