"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.register = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("../utils/config");
const commonFunctions_1 = require("../utils/commonFunctions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Service_1 = require("../db/Token/Service");
const Service_2 = require("../db/Student/Service");
// ***** LOGIN ***** //
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 400,
                statusText: "Bad Request",
                message: "Please fill all required fields",
                success: false,
            });
        }
        const studentPayload = { email };
        // CHECKING PASSWORD
        const student = await (0, Service_2.getStudentByEmail)(email).select("+auth.salt +auth.password");
        if (!student) {
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 404,
                statusText: "Not Found",
                message: "User Not Found",
                success: false,
            });
        }
        const expectedHash = (0, commonFunctions_1.authenticatePassword)(student.auth.salt, password);
        if (expectedHash !== student.auth.password) {
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 403,
                statusText: "Forbidden",
                message: "Authentication Failed",
                success: false,
            });
        }
        // GENERATING ACCESS_TOKEN
        const accessToken = (0, commonFunctions_1.generateAccessToken)(studentPayload);
        const refreshToken = jsonwebtoken_1.default.sign(studentPayload, config_1.config.secret.refreshTokenSecret);
        const token = await (0, Service_1.createToken)({
            refreshToken,
        });
        if (!token) {
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 500,
                statusText: "Internal Server Error",
                message: "Error while saving token in database",
                success: false,
            });
        }
        res.cookie(config_1.config.secret.accessTokenCookieName, accessToken, {
            domain: "localhost",
            path: "/",
        });
        res.cookie(config_1.config.secret.refreshTokenCookieName, refreshToken, {
            domain: "localhost",
            path: "/",
        });
        return (0, commonFunctions_1.sendResponse)({
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
exports.login = login;
// ***** REGISTER ***** //
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 400,
                statusText: "Bad Request",
                message: "Password fields must be matched",
                success: false,
            });
        }
        if (!email || !password || !first_name || !last_name) {
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 400,
                statusText: "Bad Request",
                message: "Please enter all required fields",
                success: false,
            });
        }
        const existingStudent = await (0, Service_2.getStudentByEmail)(email);
        if (existingStudent) {
            console.log("Student already exist");
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 400,
                statusText: "Bad Request",
                message: "Email already exists.",
                success: false,
            });
        }
        const salt = (0, commonFunctions_1.random)();
        console.log("Creating student", {
            first_name,
            last_name,
            email,
            auth: {
                salt,
                password: (0, commonFunctions_1.authenticatePassword)(salt, password),
            },
        });
        const student = await (0, Service_2.createStudent)({
            first_name,
            last_name,
            email,
            auth: {
                salt,
                password: (0, commonFunctions_1.authenticatePassword)(salt, password),
            },
        });
        return (0, commonFunctions_1.sendResponse)({
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
exports.register = register;
// ***** REFRESH TOKEN ***** //
const refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const refreshToken = authHeader.split(" ")[1];
        if (refreshToken == null)
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 401,
                statusText: "Unauthorized",
                message: "Authorization token is missing",
                success: false,
            });
        const searchedToken = await (0, Service_1.findToken)(refreshToken);
        if (!searchedToken)
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 403,
                statusText: "Forbidden",
                message: "Please log in first",
                success: false,
            });
        jsonwebtoken_1.default.verify(refreshToken, config_1.config.secret.refreshTokenSecret, (err, student) => {
            if (err)
                return (0, commonFunctions_1.sendResponse)({
                    res,
                    status: 403,
                    statusText: "Forbidden",
                    message: "Wrong token credentials",
                    success: false,
                });
            const accessToken = (0, commonFunctions_1.generateAccessToken)({ email: student.email });
            res.cookie(config_1.config.secret.accessTokenCookieName, accessToken, {
                domain: "localhost",
                path: "/",
            });
            res.cookie(config_1.config.secret.refreshTokenCookieName, refreshToken, {
                domain: "localhost",
                path: "/",
            });
            return (0, commonFunctions_1.sendResponse)({
                res,
                status: 200,
                statusText: "OK",
                message: "New token generated",
                success: true,
                data: { accessToken: accessToken },
            });
        });
    }
    catch (error) {
        console.log("Error>>", error);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 500,
            statusText: "Internal server Error",
            message: error.message,
            success: false,
        });
    }
};
exports.refreshToken = refreshToken;
// ***** LOGOUT ***** //
const logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        await (0, Service_1.deleteTokenByValue)(refreshToken);
        res.cookie(config_1.config.secret.accessTokenCookieName, "", {
            domain: "localhost",
            path: "/",
            expires: new Date(0),
        });
        res.cookie(config_1.config.secret.refreshTokenCookieName, "", {
            domain: "localhost",
            path: "/",
            expires: new Date(0),
        });
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 200,
            statusText: "OK",
            message: "Logout successfully",
            success: true,
        });
    }
    catch (error) {
        console.log("Error>>", error);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 500,
            statusText: "Internal server Error",
            message: error.message,
            success: false,
        });
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map