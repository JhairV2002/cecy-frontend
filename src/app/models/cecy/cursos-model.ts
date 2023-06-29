export interface Carrera {
  id: number;
  nombre: string;
  cursos: Curso[];
}

export interface Curso {
  id: number;
  nombre: string;
  gratis: boolean;
  cupos: number;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  fotoUrl: any;
  estudiantes: [];
  instructores: Instructor[];
  requerimientos: any[];
  preRequisitos: PreRequisito[];
  contenidos: Contenido[];
  horarios: any[];
}

export interface Instructor {
  id: number;
  nombreApellidos: string;
  avatarUrl: string;
}

export interface PreRequisito {
  id: number;
  descripcion: string;
}

export interface Contenido {
  id: number;
  descripcion: string;
}

export interface Estudiante {
  id: number;
  dni: any;
  nombre: string;
  apellido: string;
  tipo: string;
  avatarUrl: string | null;
  nivel: string | null;
  observaciones: Observaciones[];
}

export interface Observaciones {
  id: number;
  completado: boolean;
  createdAt: string;
  descripcion: string;
  updatedAt: string;
}

export interface Career {
  id: number;
  name: string;
  createdAt: Date;
  updateAt: Date;
  planificationCourse: PlanificationCursos[];
}

export interface PlanificationCursos {
  id: number;
  lectiveYear: string;
  codeCourse: string;
  name: string;
  durationTime: number;
  startDate: Date;
  finishDate: Date;
  state: string;
  free: null;
  careerId: number;
  roleId: number;
  userId: number;
  createdAt: Date;
}

export interface CourseApiNode {
  id: number;
  image: string;
  planificationId: number;
  modalityId: any;
  categoryId: number;
  entityCertificationId: number;
  courseTypeId: number;
  certifiedTypeId: number;
  formationTypeId: number;
  abbreviation: string;
  targetGroups: TargetGroup[];
  participantsRegistration: number;
  summary: string;
  project: string;
  needs: string[];
  objective: string;
  alignment: any;
  areaId: number;
  specialityId: number;
  practiceHours: number;
  theoryHours: number;
  bibliographies: string[];
  evaluationMechanisms: EvaluationMechanisms;
  learningEnvironments: LearningEnvironment[];
  teachingStrategies: string[];
  techniquesRequisites: TechniquesRequisites;
  prerequisites: string[];
  sponsorId: number;
  planification: Planification;
  category: Category;
  certifiedType: CertifiedType;
  courseType: CourseType;
  entityCertification: EntityCertification;
  formationType: FormationType;
  modality: any;
  area: Area;
  speciality: Speciality;
  topics: Topic[];
  sponsor: Sponsor;
}

export interface TargetGroup {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parentId: any;
  code: string;
  description: string;
  icon: any;
  name: string;
  type: string;
}

export interface EvaluationMechanisms {
  formative: Formative[];
  diagnostic: Diagnostic[];
  final: Final[];
}

export interface Formative {
  technique: string;
  instrument: string;
}

export interface Diagnostic {
  technique: string;
  instrument: string;
}

export interface Final {
  technique: string;
  instrument: string;
}

export interface LearningEnvironment {
  installation: Installation;
  theoreticalPhase: number;
  practicalPhase: number;
}

export interface Installation {
  id: string;
  name: string;
}

export interface TechniquesRequisites {
  technical: string[];
  general: string[];
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
  free: any;
  careerId: number;
  roleId: number;
  userId: number;
  createdAt: string;
}

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parentId: any;
  code: string;
  description: string;
  icon: any;
  name: string;
  type: string;
}

export interface CertifiedType {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parentId: any;
  code: string;
  description: string;
  icon: any;
  name: string;
  type: string;
}

export interface CourseType {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parentId: any;
  code: string;
  description: string;
  icon: any;
  name: string;
  type: string;
}

export interface EntityCertification {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parentId: any;
  code: string;
  description: string;
  icon: any;
  name: string;
  type: string;
}

export interface FormationType {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parentId: any;
  code: string;
  description: string;
  icon: any;
  name: string;
  type: string;
}

export interface Area {
  id: number;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
  parentId: any;
  code: string;
  description: any;
  icon: any;
  name: string;
  type: string;
}

export interface Speciality {
  id: number;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
  parentId: number;
  code: string;
  description: any;
  icon: any;
  name: string;
  type: string;
}

export interface Topic {
  id: string;
  courseId: number;
  description: string;
  parent: any;
}

export interface Sponsor {
  id: number;
  name: string;
  description: string;
}
