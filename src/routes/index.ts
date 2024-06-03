import express, { Router } from "express";
import auth from "./auth";
import course from "./course";
import student from "./student";

const router = express.Router();

export default (): Router => {
  // auth routes
  auth(router);
  // course routes
  course(router);
  // user routes
  student(router)
  return router;
};
