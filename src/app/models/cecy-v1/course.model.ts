import { CatalogueModel } from '@models/core';
export interface CourseModel {
  id: number;
  name: string;
  codeCourse: string;
  state: CatalogueModel;
  image: number;
  generalInformation: number;
  curriculumDesign: number;
  participantTypes?: string[];
}

export interface PlanificationCourseInitial {
  id: number;
  name: string;
  codeCourse: string;
  state: string;
  durationTime: number;
  career: Career;
  course: Course;
}

export interface Career {
  id: number;
  name: string;
}

export interface Course {
  id: number;
}
