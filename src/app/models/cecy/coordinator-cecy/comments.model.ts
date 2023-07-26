import { PlanificationCourses } from '@models/cecy/coordinator-career';

export interface Comment {
  id?: number;
  comments?: string;
  planificationId?: PlanificationCourses;
}
