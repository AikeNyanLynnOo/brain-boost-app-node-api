import dotenv from "dotenv";
dotenv.config();

import { config } from "../utils/config";
import { Request, Response, NextFunction } from "express";
import {
  StudentPayload,
  authenticatePassword,
  generateAccessToken,
  random,
  sendResponse,
} from "../utils/commonFunctions";
import jwt from "jsonwebtoken";
import {
  createToken,
  deleteTokenByValue,
  findToken,
  getTokens,
} from "../db/Token/Service";

import { createStudent, getStudentByEmail } from "../db/Student/Service";

// ***** LOGIN ***** //
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse({
        res,
        status: 400,
        statusText: "Bad Request",
        message: "Please fill all required fields",
        success: false,
      });
    }
    const studentPayload = { email };

    // CHECKING PASSWORD
    const student = await getStudentByEmail(email).select(
      "+auth.salt +auth.password"
    );
    if (!student) {
      return sendResponse({
        res,
        status: 404,
        statusText: "Not Found",
        message: "User Not Found",
        success: false,
      });
    }

    const expectedHash = authenticatePassword(student.auth.salt, password);
    if (expectedHash !== student.auth.password) {
      return sendResponse({
        res,
        status: 403,
        statusText: "Forbidden",
        message: "Authentication Failed",
        success: false,
      });
    }

    // GENERATING ACCESS_TOKEN
    const accessToken = generateAccessToken(studentPayload);
    const refreshToken = jwt.sign(
      studentPayload,
      config.secret.refreshTokenSecret
    );

    const token = await createToken({
      refreshToken,
    });

    if (!token) {
      return sendResponse({
        res,
        status: 500,
        statusText: "Internal Server Error",
        message: "Error while saving token in database",
        success: false,
      });
    }

    res.cookie(config.secret.accessTokenCookieName, accessToken, {
      domain: "localhost",
      path: "/",
    });
    res.cookie(config.secret.refreshTokenCookieName, refreshToken, {
      domain: "localhost",
      path: "/",
    });

    return sendResponse({
      res,
      status: 200,
      statusText: "OK",
      message: "Login successfully",
      success: true,
      data: {
        email: student.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
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

// ***** REGISTER ***** //
export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body;

    if(password !== confirm_password){
      return sendResponse({
        res,
        status: 400,
        statusText: "Bad Request",
        message: "Password fields must be matched",
        success: false,
      });
    }


    if (!email || !password || !first_name || !last_name) {
      return sendResponse({
        res,
        status: 400,
        statusText: "Bad Request",
        message: "Please enter all required fields",
        success: false,
      });
    }

    const existingStudent = await getStudentByEmail(email);
    if (existingStudent) {
      console.log("Student already exist");
      return sendResponse({
        res,
        status: 400,
        statusText: "Bad Request",
        message: "Email already exists.",
        success: false,
      });
    }
    const salt = random();

    console.log("Creating student", {
      first_name,
      last_name,
      email,
      auth: {
        salt,
        password: authenticatePassword(salt, password),
      },
    });

    const student = await createStudent({
      first_name,
      last_name,
      email,
      auth: {
        salt,
        password: authenticatePassword(salt, password),
      },
    });

    return sendResponse({
      res,
      status: 201,
      statusText: "Created",
      message: "Registered successfully",
      success: true,
      data: {
        first_name,
        last_name,
        email,
        enrolled_courses: student.enrolled_courses,
      },
    });
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

// ***** REFRESH TOKEN ***** //

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader.split(" ")[1];
    if (refreshToken == null)
      return sendResponse({
        res,
        status: 401,
        statusText: "Unauthorized",
        message: "Authorization token is missing",
        success: false,
      });

    const searchedToken = await findToken(refreshToken);

    if (!searchedToken)
      return sendResponse({
        res,
        status: 403,
        statusText: "Forbidden",
        message: "Please log in first",
        success: false,
      });
    jwt.verify(
      refreshToken,
      config.secret.refreshTokenSecret,
      (err: Error, student: StudentPayload) => {
        if (err)
          return sendResponse({
            res,
            status: 403,
            statusText: "Forbidden",
            message: "Wrong token credentials",
            success: false,
          });
        const accessToken = generateAccessToken({ email: student.email });

        res.cookie(config.secret.accessTokenCookieName, accessToken, {
          domain: "localhost",
          path: "/",
        });
        res.cookie(config.secret.refreshTokenCookieName, refreshToken, {
          domain: "localhost",
          path: "/",
        });

        return sendResponse({
          res,
          status: 200,
          statusText: "OK",
          message: "New token generated",
          success: true,
          data: { accessToken: accessToken },
        });
      }
    );
  } catch (error) {
    console.log("Error>>", error);
    return sendResponse({
      res,
      status: 500,
      statusText: "Internal server Error",
      message: error.message,
      success: false,
    });
  }
};

// ***** LOGOUT ***** //
export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    await deleteTokenByValue(refreshToken);
    res.cookie(config.secret.accessTokenCookieName, "", {
      domain: "localhost",
      path: "/",
      expires: new Date(0),
    });
    res.cookie(config.secret.refreshTokenCookieName, "", {
      domain: "localhost",
      path: "/",
      expires: new Date(0),
    });

    return sendResponse({
      res,
      status: 200,
      statusText: "OK",
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error>>", error);
    return sendResponse({
      res,
      status: 500,
      statusText: "Internal server Error",
      message: error.message,
      success: false,
    });
  }
};
