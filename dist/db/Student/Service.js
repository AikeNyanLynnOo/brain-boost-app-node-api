"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentById = exports.deleteStudentById = exports.createStudent = exports.getStudentById = exports.getStudentByEmail = exports.getStudents = void 0;
const Model_1 = require("./Model");
// READ
const getStudents = () => Model_1.StudentModel.find();
exports.getStudents = getStudents;
const getStudentByEmail = (email) => Model_1.StudentModel.findOne({ email });
exports.getStudentByEmail = getStudentByEmail;
const getStudentById = (id) => Model_1.StudentModel.findById(id);
exports.getStudentById = getStudentById;
// CREATE
const createStudent = async (studentValues) => {
    try {
        const student = new Model_1.StudentModel(studentValues);
        await student.save();
        return student.toObject();
    }
    catch (error) {
        throw new Error(`Unable to create student: ${error.message}`);
    }
};
exports.createStudent = createStudent;
// DELETE
const deleteStudentById = async (id) => Model_1.StudentModel.findOneAndDelete({
    _id: id,
});
exports.deleteStudentById = deleteStudentById;
// UPDATE
const updateStudentById = async (id, studentValues) => {
    try {
        const student = await Model_1.StudentModel.findByIdAndUpdate(id, studentValues);
        if (!student) {
            throw new Error("Student not found");
        }
        return student;
    }
    catch (error) {
        throw new Error(`Unable to create student: ${error.message}`);
    }
};
exports.updateStudentById = updateStudentById;
//# sourceMappingURL=Service.js.map