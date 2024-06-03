import { Request, Response, NextFunction } from "express";
import { getStudentByEmail } from "../db/Student/Service";
import { sendResponse } from "../utils/commonFunctions";
import { get } from "lodash";

// ***** GET STUDENT BY EMAIL ***** //
export const getStudentInfoByEmail = async (req: Request, res: Response) => {
  const email = get(req, "identity.email") as string;
    try {
      const student = await getStudentByEmail(email);

      return sendResponse({
        res,
        status: 200,
        statusText: "OK",
        message: "User info retrieved successfully",
        success: true,
        data: student,
      });
    } catch (error) {
      console.log("Error>>", error);
      return sendResponse({
        res,
        status: 500,
        statusText: "Internal Server Error",
        message: "Error while retrieving subjects from database",
        success: false,
      });
    }
};
