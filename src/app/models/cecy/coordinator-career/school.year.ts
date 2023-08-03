import { PlanificationCourses } from './planification.courses';

export interface SchoolYear {
  id: number;
  year: number;
  cycle: string;
  createdAt: String;
  updateAt: String;
  planifications?: PlanificationCourses;
}
