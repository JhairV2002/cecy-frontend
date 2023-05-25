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
