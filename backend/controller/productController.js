const Product = require("../models/productModel");
const ExpressError = require("../utils/ExpressError");

const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const imgs = req.files.map((file) => ({
    url: file.path,
    fileName: file.filename,
  }));
  product.image = imgs;
  const newProduct = await product.save();
  res.status(200).json(newProduct);
};
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ExpressError(500, "product not found"));
  }
  res.json(product).status(200);
};
const destroyProduct = async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return next(new ExpressError(500, "product not found"));
  }
  res.json({ message: "deleted successfully", deletedProduct });
};
const allProduct = async (req, res) => {
  const products = await Product.find({});
  res.json(products).status(200);
};
const fetchSigleProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "reviews",
    populate: { path: "owner" },
  });
  if (!product) {
    return next(new ExpressError(400, "product not found"));
  }
  const similarProduct = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  });
  console.log("similar", similarProduct);
  res.status(200).json({ product, similarProduct });
};
module.exports = {
  createProduct,
  updateProduct,
  destroyProduct,
  allProduct,
  fetchSigleProduct,
};
