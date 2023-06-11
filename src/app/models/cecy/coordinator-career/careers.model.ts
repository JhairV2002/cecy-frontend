export interface Careers {
  id: number;
  name: string;
  planificationCourse: Planification;
}

export interface getCareerDTO extends Omit<Careers, 'planificationCourse'> {}

export interface Planification {
  id: number;
  name: string;
  codeCourse: string;
  durationTime: number;
  startDate: Date;
  finishDate: Date;
  state: string;
  /* teacherId: Teacher;
  careerId: Career;
  roleId: Role;
  courseId: Course; */
}
