"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const subject_1 = require("../controllers/subject");
exports.default = (router) => {
    router.get("/subjects", auth_1.isAuthenticated, subject_1.getAllSubjects);
};
//# sourceMappingURL=subject.js.map