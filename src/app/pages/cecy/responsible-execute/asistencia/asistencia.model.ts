import { Catalogue, Observaciones } from '@models/cecy';
import { Matricula } from '@models/cecy/estudiantes/carreras';

export interface Asistencia {
  id: number;
  cursoId: number;
  evidenciaFotografica: string;
  fecha: String;
  detalleAsistencia: DetalleAsistencia[];
  observacion: string;
  /* observaciones: {
    id?: number | null;
    descripcion: string;
    completado: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[]; */
}

export interface DetalleAsistencia {
  id?: number;
  estado: Catalogue;
  matriculas: Matricula[];
}
