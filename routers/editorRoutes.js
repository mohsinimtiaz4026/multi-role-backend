const route = require("express").Router();
// middlewares
const isEditor = require("../middlewares/isEditorMiddleware");
// controllers
const { userControllers } = require("../controllers");

route.get("/all-users", isEditor, userControllers.getAllUsers);
route.post("/register", isEditor, userControllers.registerUser);

module.exports = route;
