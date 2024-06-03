import { Request, Response, NextFunction } from "express";
import { getSubjects } from "../db/Subject/Service";
import { sendResponse } from "../utils/commonFunctions";

// ***** GET ALL SUBJECTS ***** //
export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await getSubjects();

    return sendResponse({
      res,
      status: 200,
      statusText: "OK",
      message: "Subjects retrieved successfully",
      success: true,
      data: subjects,
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
