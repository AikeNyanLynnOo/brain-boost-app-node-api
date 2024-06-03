"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentInfoByEmail = void 0;
const Service_1 = require("../db/Student/Service");
const commonFunctions_1 = require("../utils/commonFunctions");
const lodash_1 = require("lodash");
// ***** GET STUDENT BY EMAIL ***** //
const getStudentInfoByEmail = async (req, res) => {
    const email = (0, lodash_1.get)(req, "identity.email");
    try {
        const student = await (0, Service_1.getStudentByEmail)(email);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 200,
            statusText: "OK",
            message: "User info retrieved successfully",
            success: true,
            data: student,
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
exports.getStudentInfoByEmail = getStudentInfoByEmail;
//# sourceMappingURL=student.js.map