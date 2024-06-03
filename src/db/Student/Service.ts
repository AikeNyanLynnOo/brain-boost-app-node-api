import { StudentModel } from "./Model";

// READ
export const getStudents = () => StudentModel.find();
export const getStudentByEmail = (email: string) =>
  StudentModel.findOne({ email });
export const getStudentById = (id: string) => StudentModel.findById(id);

// CREATE
export const createStudent = async (studentValues: Record<string, any>) => {
  try {
    const student = new StudentModel(studentValues);
    await student.save();
    return student.toObject();
  } catch (error) {
    throw new Error(`Unable to create student: ${(error as Error).message}`);
  }
};

// DELETE
export const deleteStudentById = async (id: string) =>
  StudentModel.findOneAndDelete({
    _id: id,
  });

// UPDATE
export const updateStudentById = async (
  id: string,
  studentValues: Record<string, any>
) => {
  try {
    const student = await StudentModel.findByIdAndUpdate(id, studentValues);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    throw new Error(`Unable to create student: ${(error as Error).message}`);
  }
};
