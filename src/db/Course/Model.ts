import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    image: {
      type: String,
      required: [true, "Please enter image"],
    },
    subtitle: {
      type: String,
    },
    hours: {
      type: Number,
    },
    lecturer: {
      type: String,
      required: [true, "Please enter lecturer"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please enter course price"],
    },
    promotion: {
      type: Number,
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = mongoose.model("Course", courseSchema);
