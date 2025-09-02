const route = require("express").Router();
// middlewares
const isAdmin = require("../middlewares/isAdminMiddleware");
// controllers
const { userControllers } = require("../controllers");

route.get("/all-users", isAdmin, userControllers.getAllUsers);
route.post("/register", isAdmin, userControllers.registerUser);
route.post("/update", isAdmin, userControllers.updateUserRequest);
route.post("/delete", isAdmin, userControllers.deleteUserRequest);

module.exports = route;
