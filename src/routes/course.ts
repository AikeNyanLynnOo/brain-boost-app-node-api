import { createAllCourses, getAllCourses } from "../controllers/course";
import { isAuthenticated } from "../middlewares/auth";
import { Router } from "express";

export default (router: Router) => {
  // bulk upload courses
  router.post("/courses", createAllCourses);
  // get all courses
  router.get("/courses", isAuthenticated, getAllCourses);
};
