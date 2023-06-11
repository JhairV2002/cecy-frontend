import { PlanificationCourses } from './planification.courses';

export interface SchoolYear {
  id: number;
  year: number;
  createdAt: String;
  updateAt: String;
  planifications?: PlanificationCourses;
}
