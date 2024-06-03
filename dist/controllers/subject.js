"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubjects = void 0;
const Service_1 = require("../db/Subject/Service");
const commonFunctions_1 = require("../utils/commonFunctions");
// ***** GET ALL SUBJECTS ***** //
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await (0, Service_1.getSubjects)();
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 200,
            statusText: "OK",
            message: "Subjects retrieved successfully",
            success: true,
            data: subjects,
        });
    }
    catch (error) {
        console.log("Error>>", error);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 500,
            statusText: "Internal Server Error",
            message: "Error while retrieving subjects from database",
            success: false,
        });
    }
};
exports.getAllSubjects = getAllSubjects;
//# sourceMappingURL=subject.js.map