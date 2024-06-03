"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreateCourse = exports.createCourse = exports.getCoursesByTitle = exports.getCourses = void 0;
const Model_1 = require("./Model");
// READ
const getCourses = () => Model_1.CourseModel.find();
exports.getCourses = getCourses;
const getCoursesByTitle = (title) => Model_1.CourseModel.find({ title: new RegExp("^" + title + "$", "i") }, function (err, docs) {
    if (err)
        throw new Error(`Unable to search courses: ${err.message}`);
    return docs;
});
exports.getCoursesByTitle = getCoursesByTitle;
// CREATE
const createCourse = async (courseValues) => {
    try {
        const course = new Model_1.CourseModel(courseValues);
        await course.save();
        return course.toObject();
    }
    catch (error) {
        throw new Error(`Unable to create course: ${error.message}`);
    }
};
exports.createCourse = createCourse;
const bulkCreateCourse = async (courses) => {
    const createdCourses = [];
    for (const course of courses) {
        const c = await (0, exports.createCourse)(course);
        createdCourses.push(c);
    }
    return createdCourses;
};
exports.bulkCreateCourse = bulkCreateCourse;
// DELETE
// UPDATE
//# sourceMappingURL=Service.js.map