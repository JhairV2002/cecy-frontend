import { Catalogue, Observaciones } from '@models/cecy';
import { Matricula } from '@models/cecy/estudiantes/carreras';

export interface Asistencia {
  id: number;
  periodo: string;
  cursoId: number;
  evidenciaFotografica: string;
  duracionClase: string;
  fecha: String;
  detalleAsistencia: DetalleAsistencia[];
  observaciones: {
    id?: number | null;
    descripcion: string;
    completado: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
}

export interface DetalleAsistencia {
  id?: number;
  estado: Catalogue;
  matriculas: Matricula[];
}
