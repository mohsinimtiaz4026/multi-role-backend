// utils
const {jwtUtils} = require('../utils');

const authToken = (req, res, next) => {
  let token;
  try {
    token = req.cookies.token;

    const isVerifiedToken = jwtUtils.verifyToken(token);
    if (isVerifiedToken) {
      next();
    } else {
      return res.status(403).send('Unauthorized');
    }
  } catch (error) {
    return res.status(403).send('No Token Attached with Header');
  }
};

module.exports = authToken;
