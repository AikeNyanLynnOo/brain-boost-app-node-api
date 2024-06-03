"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const course_1 = __importDefault(require("./course"));
const student_1 = __importDefault(require("./student"));
const router = express_1.default.Router();
exports.default = () => {
    // auth routes
    (0, auth_1.default)(router);
    // course routes
    (0, course_1.default)(router);
    // user routes
    (0, student_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map