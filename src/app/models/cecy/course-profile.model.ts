import {CourseModel} from "@models/cecy";
export interface CourseProfileModel {
  id?: number;
  course?: CourseModel;
  requiredExperiences?: [];
  requiredKnowledges?: [];
  requiredSkills?: [];
  createdAt?: Date;
  updatedAt?: Date;
}
