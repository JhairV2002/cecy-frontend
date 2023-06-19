export interface Planification {
  id: number;
  codeCourse: string;
  name: string;
}

export interface Curso {
  id: number;
  abbreviation: string;
  planification: Planification;
  modality: string;
  name: string;
  summary: string;
  courseStatus: boolean;
}
