import {CourseModel} from "@models/cecy";

export interface PrerequisiteModel {
  id?: number;
  course?: CourseModel;
  prerequisite?: CourseModel;
  createdAt?: Date;
  updatedAt?: Date;
}
