import { Document } from "mongoose";
import { CourseModel } from "./Model";

// READ
export const getCourses = () => CourseModel.find();
export const getCoursesByTitle = (title: string) =>
  CourseModel.find(
    { title: new RegExp("^" + title + "$", "i") },
    function (err: Error, docs: []) {
      if (err) throw new Error(`Unable to search courses: ${err.message}`);
      return docs;
    }
  );

// CREATE
export const createCourse = async (courseValues: Record<string, any>) => {
  try {
    const course = new CourseModel(courseValues);
    await course.save();
    return course.toObject();
  } catch (error) {
    throw new Error(`Unable to create course: ${(error as Error).message}`);
  }
};
export const bulkCreateCourse = async (courses: any[]) => {
  const createdCourses = [];
  for (const course of courses) {
    const c = await createCourse(course);
    createdCourses.push(c);
  }
  return createdCourses;
};

// DELETE

// UPDATE
