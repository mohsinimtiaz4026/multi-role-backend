// models
const User = require("../models/User");
// utils
const { jwtUtils } = require("../utils");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(404)
        .send({ message: "Unauthorized User: You've no Permission to access" });
    }
    const decoded = jwtUtils.verifyToken(token);
    const user = await User.findById(decoded.userId);
    if(!user) {
        return res
        .status(404)
        .send({ message: "Unauthorized: User not found!" });
    }
    console.log(user);
    if(user.role !== "admin") {
        return res
        .status(404)
        .send({ message: "Unauthorized: User is not an admin" });
    }
    next();
  } catch (error) {}
};
module.exports = isAdmin;
