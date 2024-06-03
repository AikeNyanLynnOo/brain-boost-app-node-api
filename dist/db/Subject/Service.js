"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectById = exports.deleteSubjectById = exports.createSubject = exports.getSubjectById = exports.getSubjects = void 0;
const Model_1 = require("./Model");
// READ
const getSubjects = () => Model_1.SubjectModel.find();
exports.getSubjects = getSubjects;
const getSubjectById = (id) => Model_1.SubjectModel.findById(id);
exports.getSubjectById = getSubjectById;
// CREATE
const createSubject = async (subjectValues) => {
    try {
        const subject = new Model_1.SubjectModel(subjectValues);
        await subject.save();
        return subject.toObject();
    }
    catch (error) {
        throw new Error(`Unable to create subject: ${error.message}`);
    }
};
exports.createSubject = createSubject;
// DELETE
const deleteSubjectById = async (id) => Model_1.SubjectModel.findOneAndDelete({
    _id: id,
});
exports.deleteSubjectById = deleteSubjectById;
// UPDATE
const updateSubjectById = async (id, subjectValues) => {
    try {
        const subject = await Model_1.SubjectModel.findByIdAndUpdate(id, subjectValues);
        if (!subject) {
            throw new Error("Subject not found");
        }
        return subject;
    }
    catch (error) {
        throw new Error(`Unable to create subject: ${error.message}`);
    }
};
exports.updateSubjectById = updateSubjectById;
//# sourceMappingURL=Service.js.map