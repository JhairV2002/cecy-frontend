export interface Estudiantes {
  id: number;
  cedula: any;
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
  empresaId: any;
  matriculas: any[];
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
  nombre: string;
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
