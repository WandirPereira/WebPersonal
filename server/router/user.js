const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.get("/user/me", [md_auth.assureAuth], UserController.getMe);
api.get("/users", [md_auth.assureAuth], UserController.getUsers);
//api.get("/users/:active", [md_auth.assureAuth], UserController.getUsers);

module.exports = api;
