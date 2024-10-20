require("dotenv").config();
const express = require("express");
const app = express();
const dataBase = require("./config/database");
const Product = require("./models/productModel");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const passport = require("passport");
const LocalStategy = require("passport-local");
const User = require("./models/userModel");
const { isLoggedIn } = require("./middleware/middlerware");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const Razorpay = require("razorpay");
const paymentsRoutes = require("./routes/orderRoutes");
const Review = require("./models/reviewModel");
const Cart = require("./models/cartModel");

const cors = require("cors");

const sessionOptions = {
  secret: "supersecretkey",
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["get", "post", "delete", "put"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "pragma",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/product", productRouter);
app.use("/review", reviewRoute);
app.use("/", userRouter);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes);
app.use("/order", paymentsRoutes);
app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong " } = err;
  res.status(status).json(message);
});
app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
