import { CourseModel } from "@models/cecy";

export interface TopicModel {
  id?: number;
  course?: CourseModel;
  children?: TopicModel[];
  parent?: number;
  level?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
