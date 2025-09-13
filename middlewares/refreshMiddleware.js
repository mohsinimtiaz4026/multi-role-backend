const {jwtUtils} = require('../utils');

const refreshToken = (req, res, next) => {
  let token;
  try {
    token = req.cookies.token;

    const decodedToken = jwtUtils.decodeToken(token);

    let newTokenValues = decodedToken ? decodedToken : req.body;

    let newToken = jwtUtils.signToken({...newTokenValues});

    res.cookie('token', newToken, process.env.COOKIE_SECRET, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60,
    });

    next();
  } catch (error) {
    return res.status(403).send('No Token Attached with Header');
  }
};
module.exports = refreshToken;
