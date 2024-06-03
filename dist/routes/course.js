"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = require("../controllers/course");
const auth_1 = require("../middlewares/auth");
exports.default = (router) => {
    // bulk upload courses
    router.post("/courses", course_1.createAllCourses);
    // get all courses
    router.get("/courses", auth_1.isAuthenticated, course_1.getAllCourses);
};
//# sourceMappingURL=course.js.map