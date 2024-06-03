"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const config_1 = require("../utils/config");
const commonFunctions_1 = require("../utils/commonFunctions");
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null)
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 401,
                statusText: "Unauthorized",
                message: "User not authorized to view courses",
                success: false,
            });
        jsonwebtoken_1.default.verify(token, config_1.config.secret.accessTokenSecret, (err, student) => {
            console.log(err);
            if (err)
                return (0, commonFunctions_1.sendResponse)({
                    res,
                    status: 403,
                    statusText: "Forbidden",
                    message: "Authentication failed",
                    success: false,
                });
            console.log(student);
            (0, lodash_1.merge)(req, { identity: student });
            next();
        });
    }
    catch (error) {
        console.log("Error>>", error);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 500,
            statusText: "Internal Server Error",
            message: error.message,
            success: false,
        });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.js.map