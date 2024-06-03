import { login, logout, refreshToken, register } from "../controllers/auth";
import { Router } from "express";

export default (router: Router) => {
  router.post("/auth/login", login);
  router.post("/auth/register", register);
  router.post("/auth/logout", logout);
  router.post("/auth/token", refreshToken);
};
