import { Planification } from "./coordinator-career";

export interface Courses {
  id: number;
  abbreviation: null | string;
  alignment: null;
  planificationId: number;
  planification: Planification;
  area: Area;
  areaId: null;
  attendances: Attendance[];
  bibliographies: string[];
  category: Area;
  categoryId: number | null;
  certifiedType: Area;
  certifiedTypeId: number | null;
  courseType: Area;
  courseTypeId: number | null;
  entityCertification: Area;
  entityCertificationId: number | null;
  evaluationMechanisms: EvaluationMechanisms;
  formationType: Area;
  formationTypeId: number | null;
  image: null | string;
  learningEnvironments: LearningEnvironment[];
  needs: string[];
  objective: string;
  participantsRegistration: number | null;
  practiceHours: number;
  prerequisites: string[];
  project: null | string;
  speciality: Area;
  specialityId: number;
  sponsor: Sponsor;
  sponsorId: number | null;
  state: string;
  summary: null | string;
  targetGroups: TargetGroup[] | null;
  teachingStrategies: string[];
  techniquesRequisites: TechniquesRequisites;
  theoryHours: number;
  topics: Topic[];

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

export interface Attendance {
  courseId: number;
  createdAt: Date;
  evidenciaFotografica: string;
  fecha: Date;
  id: number;
  observaciones: string;
  updatedAt: Date;
}

export interface TargetGroup {
  code: string;
  createdAt: Date;
  deletedAt: null;
  description: string;
  icon: null;
  id: number;
  name: string;
  parentId: null;
  type: string;
  updatedAt: Date;
}

export interface TechniquesRequisites {
  general: string[];
  technical: string[];
}

export interface Topic {
  courseId: number;
  description: string;
  id: number;
}

export interface EvaluationMechanisms {
  diagnostic: Diagnostic[];
  final: Diagnostic[];
  formative: Diagnostic[];
}

export interface Diagnostic {
  instrument: string;
  technique: string;
}

export interface LearningEnvironment {
  installation: Installation;
  practicalPhase: number;
  theoreticalPhase: number;
}

export interface Installation {
  id: string;
  name: string;
}

export interface Sponsor {
  description: null;
  id: number;
  name: string;
}

