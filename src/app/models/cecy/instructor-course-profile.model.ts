import { CourseProfileModel } from "@models/cecy";

export interface InstructorCourseProfileModel {
  id?: number;
  instructor?: any;
  courseProfile?: CourseProfileModel;
  createdAt?: Date;
  updatedAt?: Date;
}
