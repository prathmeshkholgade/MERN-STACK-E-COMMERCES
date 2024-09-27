const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new ExpressError(500, "you must be logged in"));
  }
  next();
};
