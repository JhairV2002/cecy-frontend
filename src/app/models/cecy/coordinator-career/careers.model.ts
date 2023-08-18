import { Courses } from "../courses";

export interface Careers {
  id: number;
  name: string;
  planificationCourse: Planification[];
}

export interface getCareerDTO extends Omit<Careers, 'planificationCourse'> { }

export interface Planification {
  id: number;
  career: Career;
  careerId: number;
  codeCourse: string;
  comments: any[];
  course: Courses;
  createdAt: Date;
  detailPlan: DetailPlan[];
  durationTime: number;
  finishDate: Date;
  free: boolean;
  modality: Area;
  modalityId: number;
  name: string;
  planningReviewId: number;
  schoolYear: SchoolYear;
  schoolYearId: number;
  startDate: Date;
  state: string;
  user: User;
  userId: number;
}

export interface Area {
  code: string;
  createdAt: Date | null;
  deletedAt: null;
  description: null | string;
  icon: null;
  id: number;
  name: string;
  parentId: number | null;
  type: string;
  updatedAt: Date | null;
}


export interface Career {
  createdAt: Date;
  id: number;
  name: string;
  updateAt: Date;
}

export interface User {
  createdAt: Date;
  email: string;
  genderId: number;
  id: number;
  identityCard: string;
  image: string;
  lastnames: string;
  names: string;
  password: string;
  phone: string;
  recoveryToken: null;
  roleId: number;
  updateAt: Date;
}


export interface SchoolYear {
  createdAt: Date;
  cycle: string;
  finishDate: null;
  id: number;
  startDate: null;
  updateAt: Date;
  year: number;
}

export interface DetailPlan {
  classroomId: number;
  dayId: number;
  endedTime: string;
  id: number;
  instructorId: null;
  observation: string;
  parallelId: number;
  planificationCourseId: number;
  startedTime: string;
  state: null;
  workdayId: number;
}
