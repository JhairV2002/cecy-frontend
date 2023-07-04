export interface PlanificationCourse {
  id: number;
  codeCourse: string;
  name: string;
  state: string;
}

export interface Workday{
  id: number;
  name: string;
}

export interface Curso {
  id: number;
  workday: Workday;
  planificationCourse: PlanificationCourse;
  courseStatus: boolean;
}
