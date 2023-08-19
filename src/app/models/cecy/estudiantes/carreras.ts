import { Catalogue } from '../catalogue';
import { Inscription } from '../inscription';

export interface CarrerasApi {
  id?: number;
  name?: string;
  createdAt?: string;
  updateAt?: string;
  planificationCourse?: PlanificationCourse[];
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

export interface Matricula {
  id?: number;
  cursoId: number;
  cursoNombre: string;
  nota1?: any;
  nota2?: any;
  promedio?: any;
  porcentajeAsistencia?: any;
  observaciones?: any[];
  estadoMatricula: Catalogue;
  estadoCurso: Catalogue;
  asistencias?: any[];
  estudiantes: Estudiantes | null;
  formInscription: Inscription | null;
}

export interface Estudiantes {
  id: number;
  cedula: string;
  fechaNacimiento: string;
  clave?: string;
  nombres: string;
  apellidos: string;
  email: string;
  discapacidad: boolean;
  detallesDiscapacidad: string;
  direccion: string;
  numeroCelular: string;
  numeroConvencional: string;
  genero: Genero;
  tipoEstudiante: TipoEstudiante;
  etnia: Etnia;
  nivelInstruccion: NivelInstruccion;
  situacionEconomica: SituacionEconomica;
  preRequisitos: any[];
  empresas: any[];
  matriculas: number[];
  rol: string;
}

export interface Genero {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface TipoEstudiante {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Etnia {
  id: number;
  nombre: any;
  descripcion: string;
}

export interface NivelInstruccion {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface SituacionEconomica {
  id: number;
  nombre: string;
  descripcion: string;
}
