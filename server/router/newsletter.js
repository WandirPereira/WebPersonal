const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/newsletter", [md_auth.assureAuth] , NewsletterController.subscribeEmail);
api.get("/newsletter",  [md_auth.assureAuth] , NewsletterController.getEmails);
// api.patch("/menu/:id", [md_auth.assureAuth], MenuController.updateMenu);
api.delete("/newsletter/:id", [md_auth.assureAuth], NewsletterController.deleteEmail);

module.exports = api;