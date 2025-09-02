// utils
const { jwtUtils } = require("../utils");

module.exports = authToken = (req, res, next) => {
  let token;
  try {
    token = req.cookies.token;
    const isVerifiedToken = jwtUtils.verifyToken(token);
    if (isVerifiedToken) {
      next();
    }
  } catch (error) {
    return res.status(403).send("No Token Attached with Header");
  }
};
