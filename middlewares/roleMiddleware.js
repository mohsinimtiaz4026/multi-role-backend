// helpers
const roles = require("../helpers/permissionRoles");
// models
const User = require("../models/User");

const roleCheck = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      const userRole = user.role;
      const permissions = roles[userRole] || [];
      if (permissions.includes(requiredPermission)) {
        return next();
      }
      return res
        .status(403)
        .send({ message: "Forbidden: You don't have permission" });
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  };
};
module.exports = roleCheck;
