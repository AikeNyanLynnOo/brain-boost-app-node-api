import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  // for later
});

export const SubjectModel = mongoose.model("Subject", subjectSchema);
