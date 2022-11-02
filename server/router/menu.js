const express = require("express");
const MenuController = require("../controllers/menu");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/menu", [md_auth.assureAuth] , MenuController.createMenu);
api.get("/menu",  MenuController.getMenus);
api.patch("/menu/:id", [md_auth.assureAuth], MenuController.updateMenu);
api.delete("/menu/:id", [md_auth.assureAuth], MenuController.deleteMenu);

module.exports = api;