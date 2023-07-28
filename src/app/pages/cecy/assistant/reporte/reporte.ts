export interface Reporte {
  id?: number;
  fechaReporte?: Date;
  reportes: Reportes[];
}
export interface Reportes {
  matriculas: Matricula;
}

export interface Matricula {
  id?: number;
  cursoId?: number;
  nota1?: any;
  nota2?: any;
  promedio?: any;
  porcentajeAsistencia?: any;
  observaciones?: any[];
  estadoMatricula?: EstadoMatricula;
  estadoCurso?: EstadoCurso;
  asistencias?: any[];
  estudiantes?: Estudiantes;
  aprobado?: number;
  reprobado?: number;
}

export interface EstadoMatricula {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface EstadoCurso {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Estudiantes {
  id: number;
  dni: string;
  fechaNacimiento: string;
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
