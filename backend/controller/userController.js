const User = require("../models/userModel");

const login = (req, res) => {
  res.json({ message: "you are logged in", id: req.user.id });
};
const signup = async (req, res, next) => {
  const { password, ...other } = req.body;
  const newUser = new User(other);
  const registerUser = await User.register(newUser, password);
  req.login(registerUser, (err) => {
    if (err) {
      return next(err);
    }
    res.send(registerUser);
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
module.exports = { login, signup, logOut };
