const express = require("express");
const { isLoggedIn } = require("../middleware/middlerware");
const wrapAsync = require("../utils/wrapAsync");
const {
  createProduct,
  allProduct,
  updateProduct,
  destroyProduct,
  fetchSigleProduct,
} = require("../controller/productController");
const router = express.Router();
const { storage, cloudinary } = require("../config/cloudConfig");
const multer = require("multer");
const upload = multer({ storage });

//create
router.post("/add", upload.array("img", 12), wrapAsync(createProduct));
//read
router.get("/", wrapAsync(allProduct));
//update
router.put("/edit/:id", isLoggedIn, wrapAsync(updateProduct));
//delete
router.delete("/delete/:id", isLoggedIn, wrapAsync(destroyProduct));
//sigleProduct
router.get("/:id", wrapAsync(fetchSigleProduct));

module.exports = router;
