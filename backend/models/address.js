const Mongoose = require("mongoose");
const schema = Mongoose.Schema;
const addressSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fristName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  number: { type: String, required: true },
  alternateNumber: { type: String },
  landmark: { type: String, required: true },
  address: { type: String, required: true },
});

const Address = Mongoose.model("Address", addressSchema);
module.exports = Address;
