import { isAuthenticated } from "../middlewares/auth";
import { getAllSubjects } from "../controllers/subject";
import { Router } from "express";

export default (router: Router) => {
  router.get("/subjects", isAuthenticated, getAllSubjects);
};
