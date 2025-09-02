// models
const User = require("../models/User");
// utils
const { jwtUtils } = require("../utils");

const isEditor = async (req, res, next) => {
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
    if(user.role !== "editor") {
        return res
        .status(404)
        .send({ message: "Unauthorized: User is not an Editor" });
    }
    next();
  } catch (error) {}
};
module.exports = isEditor;
