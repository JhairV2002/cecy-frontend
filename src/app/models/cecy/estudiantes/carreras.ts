export interface CarrerasApi {
  id: number;
  name: string;
  createdAt: string;
  updateAt: string;
  planificationCourse: PlanificationCourse[];
}

export interface PlanificationCourse {
  id: number;
  lectiveYear: string;
  codeCourse: string;
  name: string;
  durationTime: number;
  startDate: string;
  finishDate: string;
  state: string;
  free: any;
  careerId: number;
  roleId: number;
  userId: number;
  createdAt: string;
}

export interface Course {
  id: number;
  image: any;
  planificationId: number;
  modalityId: any;
  categoryId: any;
  entityCertificationId: any;
  courseTypeId: any;
  certifiedTypeId: any;
  formationTypeId: any;
  abbreviation: any;
  targetGroups: any;
  participantsRegistration: any;
  summary: any;
  project: any;
  needs: string[];
  objective: any;
  alignment: any;
  areaId: any;
  specialityId: any;
  practiceHours: any;
  theoryHours: any;
  bibliographies: any;
  evaluationMechanisms: any;
  learningEnvironments: any;
  teachingStrategies: any;
  techniquesRequisites: any;
  prerequisites: any;
  sponsorId: any;
  planification: Planification;
  category: any;
  certifiedType: any;
  courseType: any;
  entityCertification: any;
  formationType: any;
  modality: any;
  area: any;
  speciality: any;
  topics: any[];
  sponsor: any;
}

export interface Planification {
  id: number;
  lectiveYear: string;
  codeCourse: string;
  name: string;
  durationTime: number;
  startDate: string;
  finishDate: string;
  state: string;
  free: boolean;
  careerId: number;
  roleId: number;
  userId: number;
  createdAt: string;
}
