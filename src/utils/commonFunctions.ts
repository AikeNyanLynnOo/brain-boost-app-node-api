import dotenv from "dotenv";
dotenv.config();

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { Response } from "express";

export interface StudentPayload {
  email: string;
}
export interface ResponseType {
  res: Response;
  status: number;
  statusText: string;
  success: boolean;
  message?: string;
  data?: any[] | object;
}

export const generateAccessToken = (studentPayload: StudentPayload) => {
  return jwt.sign(studentPayload, config.secret.accessTokenSecret, {
    expiresIn: "180s", // expired time is up to you
  });
};

export const random = () => crypto.randomBytes(128).toString("base64");
export const authenticatePassword = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(config.secret.passwordEncryptionSecret)
    .digest("hex");
};

export const sendResponse = ({
  res,
  status,
  statusText,
  success,
  message,
  data,
}: ResponseType) => {
  return res.status(status).json({
    status,
    statusText,
    success,
    message,
    data,
  });
};
