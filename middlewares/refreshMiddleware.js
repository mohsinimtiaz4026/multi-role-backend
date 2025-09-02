const refreshToken = (req, res, next) => {
  let token;
  try {
    token = req.cookies.token;
    const decodedToken = jwtUtils.decodeToken(token);
    let newTokenValues = {
      id: decodedToken.id,
    };
    if (decodedToken) {
      let token = jwtUtils.signToken({ ...newTokenValues });
      res.cookie("token", token, process.env.COOKIE_SECRET, {
        httpOnly: true,
        secure: false,
        maxAge: 259200000,
      });
      next();
    }
  } catch (error) {
    return res.status(403).send("No Token Attached with Header");
  }
};
module.exports = refreshToken;
