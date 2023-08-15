export interface PlanificationCourse {
  id: number;
  codeCourse: string;
  name: string;
  state: string;
  startDate: string;
  finishDate: string;
}

export interface Workday {
  id: number;
  name: string;
}

export interface Curso {
  id: number;
  workday: Workday;
  planificationCourse: PlanificationCourse;
  statusCourse: string;
}

export interface StatusOption {
  label: string;
  value: string;
}
