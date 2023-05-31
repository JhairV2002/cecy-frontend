import { CourseProfileModel, InstructorModel } from "@models/cecy";

export interface InstructorCourseProfileModel {
  id?: number;
  instructor?: InstructorModel;
  courseProfile?: CourseProfileModel;
  createdAt?: Date;
  updatedAt?: Date;
}
