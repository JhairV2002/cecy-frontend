import { Curso } from "../curso/curso";
import { Estudiantes } from "../notas/estudiante.model";

export interface Asistencia {
    id: number;
    cursoId: Curso[];
    periodo: string;
    evidenciaFotografica: string;
    durancionClase: string;
    fecha: Date;
    estudiantes: Estudiantes[];
  }