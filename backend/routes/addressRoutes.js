const express = require("express");
const {
  addAddress,
  deleteAddress,
} = require("../controller/addressController");
const { isLoggedIn } = require("../middleware/middlerware");
const wrapAsync = require("../utils/wrapAsync");
const Address = require("../models/address");
const ExpressError = require("../utils/ExpressError");
const router = express.Router();

router.post("/", isLoggedIn, wrapAsync(addAddress));
router.put(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    console.log("trying to updating from address model");
    console.log(req.body);
    const id = req.params.id;
    const address = await Address.findById(id);
    console.log(address);
    if (!address) {
      return next(new ExpressError(400, "address not found"));
    }
    if (req.user._id.toString() !== address.user.toString()) {
      console.log(req.user._id, address.user);
      return next(
        new ExpressError(400, "you are not authorized  to update this address")
      );
    }

    // Update only the fields provided in req.body
    Object.assign(address, req.body);

    // Save the updated address to the database
    await address.save();

    res.send(address);
  })
);
router.delete("/:id", isLoggedIn, wrapAsync(deleteAddress));
module.exports = router;
