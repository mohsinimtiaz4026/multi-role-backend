const bcrypt = require("bcrypt");

module.exports = {
  saltHashPassword: async (password) => {
    let hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  },
  comparePassword: async (password, dbPassword) => {
    let matchPassword = await bcrypt.compare(password, dbPassword);
    return matchPassword;
  },
};
