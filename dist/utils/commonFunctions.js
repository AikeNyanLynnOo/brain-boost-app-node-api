"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.authenticatePassword = exports.random = exports.generateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const generateAccessToken = (studentPayload) => {
    return jsonwebtoken_1.default.sign(studentPayload, config_1.config.secret.accessTokenSecret, {
        expiresIn: "180s", // expired time is up to you
    });
};
exports.generateAccessToken = generateAccessToken;
const random = () => crypto_1.default.randomBytes(128).toString("base64");
exports.random = random;
const authenticatePassword = (salt, password) => {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(config_1.config.secret.passwordEncryptionSecret)
        .digest("hex");
};
exports.authenticatePassword = authenticatePassword;
const sendResponse = ({ res, status, statusText, success, message, data, }) => {
    return res.status(status).json({
        status,
        statusText,
        success,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=commonFunctions.js.map