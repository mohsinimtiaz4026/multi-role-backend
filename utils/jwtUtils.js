const jwt = require("jsonwebtoken");

module.exports = {
  signToken: (obj) => {
    let givenToken = jwt.sign(obj, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return givenToken;
  },
  verifyToken: (token) => {
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifyToken;
  },
  decodeToken: (token) => {
    let decodeToken = jwt.decode(token);
    return decodeToken;
  },
};
