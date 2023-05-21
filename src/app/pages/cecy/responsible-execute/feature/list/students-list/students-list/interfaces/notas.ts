import { Persona } from './persona';

export interface Nota {
  id: number;
  estudianteId: number;
  cedula: string;
  nota1: number;
  nota2: number;
  notafinal: number;
  estudiante?: Persona;
  nombreEstudiante?: string;
  estado: string;
  nombres: string;
}
