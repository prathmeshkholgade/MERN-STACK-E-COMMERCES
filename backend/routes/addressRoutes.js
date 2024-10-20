const express = require("express");
const {
  addAddress,
  deleteAddress,
} = require("../controller/addressController");
const { isLoggedIn } = require("../middleware/middlerware");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

router.post("/", isLoggedIn, addAddress);
router.delete("/:id", isLoggedIn, wrapAsync(deleteAddress));
module.exports = router;
