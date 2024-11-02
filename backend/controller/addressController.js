const Address = require("../models/address");
const User = require("../models/userModel.js");
const ExpressError = require("../utils/ExpressError.js");

const addAddress = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findById(req.user.id);
  const address = req.body;
  if (!req.body.fristName && !req.body.lastName) {
    const [fristName, lastName] = req.body.fullName.split(" ");
    console.log(fristName, "and ", lastName);
    address.fristName = fristName;
    address.lastName = lastName;
  }
  const newAddress = new Address(address);
  newAddress.user = req.user._id;
  await newAddress.save();
  console.log(newAddress);
  user.addresses.push(newAddress._id);
  await user.save();
  res.json({ user, newAddress });
};
const deleteAddress = async (req, res, next) => {
  const { id } = req.params;
  const address = await Address.findById(id);
  if (!address) {
    return next(new ExpressError(404, "Address not found"));
  }
  if (req.user._id.toString() !== address.user.toString()) {
    return next(
      new ExpressError(404, "You are not authorized to delete this address")
    );
  }
  await Address.findByIdAndDelete(id);
  const user = await User.findById(req.user._id);
  user.addresses = user.addresses.filter((addr) => addr.toString() !== id);
  await user.save();
  res.status(200).json({ message: "Address deleted successfully" });
};

module.exports = { addAddress, deleteAddress };
