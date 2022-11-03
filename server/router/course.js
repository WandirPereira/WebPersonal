const express = require("express");
const CourseController = require("../controllers/course");
const  multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/course" });

const api = express.Router();

api.post("/course", [md_auth.assureAuth, md_upload] , CourseController.createCourse);
api.get("/courses",  [md_auth.assureAuth], CourseController.getCourses);
api.patch("/course/:id", [md_auth.assureAuth, md_upload], CourseController.updateCourse);
api.delete("/course/:id", [md_auth.assureAuth], CourseController.deleteCourse);

module.exports = api;