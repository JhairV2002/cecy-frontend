import { Catalogue, Observaciones } from '@models/cecy';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import {
  EstadoCurso,
  EstadoMatricula,
  Estudiantes,
} from '../notas/estudiante.model';

export interface Asistencia {
  id: number;
  evidenciaFotografica: string;
  fecha: String | undefined;
  observaciones: string;
  cursoId?: number;
}

export interface DetalleAsistencia {
  id?: number;
  estado: Catalogue;
  matriculas: Matricula[];
}

export interface Matriculas {
  id: number;
  cursoId: number;
  nota1: any;
  nota2: any;
  promedio: any;
  porcentajeAsistencia: any;
  observaciones: any[];
  estadoMatricula: EstadoMatricula;
  estadoCurso: EstadoCurso;
  asistencias: any[];
  estudiantes: Estudiantes;
}
