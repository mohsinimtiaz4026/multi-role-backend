const route = require("express").Router();
// controllers
const { userControllers } = require("../controllers");
// middlewares
const authToken = require("../middlewares/authMiddleware");
const refreshToken = require("../middlewares/refreshMiddleware");

route.post("/register", userControllers.registerUser);
route.post("/login", userControllers.loginUser);
route.post("/update", userControllers.updateUserRequest);
route.post("/delete", userControllers.deleteUserRequest);
route.post("/logout",userControllers.logoutUserRequest);

module.exports = route;
