import { SubjectModel } from "./Model";

// READ
export const getSubjects = () => SubjectModel.find();
export const getSubjectById = (id: string) => SubjectModel.findById(id);

// CREATE
export const createSubject = async (subjectValues: Record<string, any>) => {
  try {
    const subject = new SubjectModel(subjectValues);
    await subject.save();
    return subject.toObject();
  } catch (error) {
    throw new Error(`Unable to create subject: ${(error as Error).message}`);
  }
};

// DELETE
export const deleteSubjectById = async (id: string) =>
  SubjectModel.findOneAndDelete({
    _id: id,
  });

// UPDATE
export const updateSubjectById = async (
  id: string,
  subjectValues: Record<string, any>
) => {
  try {
    const subject = await SubjectModel.findByIdAndUpdate(id, subjectValues);
    if (!subject) {
      throw new Error("Subject not found");
    }
    return subject;
  } catch (error) {
    throw new Error(`Unable to create subject: ${(error as Error).message}`);
  }
};
