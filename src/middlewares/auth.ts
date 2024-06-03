import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { get, merge } from "lodash";
import { config } from "../utils/config";
import { StudentPayload, sendResponse } from "../utils/commonFunctions";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return sendResponse({
        res,
        status: 401,
        statusText: "Unauthorized",
        message: "User not authorized to view courses",
        success: false,
      });
    jwt.verify(
      token,
      config.secret.accessTokenSecret,
      (err: Error, student: StudentPayload) => {
        console.log(err);
        if (err)
          return sendResponse({
            res,
            status: 403,
            statusText: "Forbidden",
            message: "Authentication failed",
            success: false,
          });
        console.log(student);
        merge(req, { identity: student });
        next();
      }
    );
  } catch (error) {
    console.log("Error>>", error);
    return sendResponse({
      res,
      status: 500,
      statusText: "Internal Server Error",
      message: error.message,
      success: false,
    });
  }
};
