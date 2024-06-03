import { isAuthenticated } from "../middlewares/auth";
import { Router } from "express";
import { getStudentInfoByEmail } from "../controllers/student";

export default (router: Router) => {
  router.get("/user", isAuthenticated, getStudentInfoByEmail);
};
