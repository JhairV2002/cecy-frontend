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

export interface EstadoMatricula {
  id?: number;
  nombre?: string;
  descripcion: string;
}

export interface EstadoCurso {
  id?: number;
  nombre?: string;
  descripcion: string;
}

export interface Estudiantes {
  id: number;
  dni: string;
  fechaNacimiento: string;
  cedula: string;
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
  matriculas: any;
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

// Obtener todos los elementos con la clase "tooltip-trigger"
const tooltipTriggers = document.querySelectorAll<HTMLElement>('.tooltip-trigger');

// Recorrer cada elemento y agregar eventos de ratón
tooltipTriggers.forEach((trigger) => {
  trigger.addEventListener('mouseenter', showTooltip);
  trigger.addEventListener('mouseleave', hideTooltip);
});

// Función para mostrar el tooltip
function showTooltip(event: MouseEvent) {
  const tooltip = (event.target as HTMLElement).querySelector('.tooltip') as HTMLElement;
  if (tooltip) {
    tooltip.style.display = 'block';
  }
}

// Función para ocultar el tooltip
function hideTooltip(event: MouseEvent) {
  const tooltip = (event.target as HTMLElement).querySelector('.tooltip') as HTMLElement;
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}
