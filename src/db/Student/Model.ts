import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    enrolled_courses : [{
      type : Schema.ObjectId,
      ref : "Course"
    }],
    auth: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const StudentModel = mongoose.model("Student", studentSchema);
