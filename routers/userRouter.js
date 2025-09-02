const route = require("express").Router();
// controllers
const { userControllers } = require("../controllers");
// middlewares
const authToken = require("../middlewares/authMiddleware");
const refreshToken = require("../middlewares/refreshMiddleware");

route.post("/register", authToken, userControllers.registerUser);
route.post("/login", authToken, userControllers.loginUser);
route.post("/update", userControllers.updateUserRequest);
route.post("/delete", userControllers.deleteUserRequest);

module.exports = route;
