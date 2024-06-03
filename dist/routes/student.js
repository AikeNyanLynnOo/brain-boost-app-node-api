"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const student_1 = require("../controllers/student");
exports.default = (router) => {
    router.get("/user", auth_1.isAuthenticated, student_1.getStudentInfoByEmail);
};
//# sourceMappingURL=student.js.map