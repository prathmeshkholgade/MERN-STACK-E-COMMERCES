const express = require("express");
const User = require("../models/userModel");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { signup, login, logOut } = require("../controller/userController");
const router = express.Router();

//signup route
router.post("/signup", wrapAsync(signup));
//login
router.post("/login", passport.authenticate("local"), login);
//logout
router.get("/logout", logOut);

module.exports = router;
