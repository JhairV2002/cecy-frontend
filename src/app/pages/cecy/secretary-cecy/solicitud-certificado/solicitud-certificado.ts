export interface SolicitudCertificado{
  id: number,
  estudianteId: Persona ,
  cursoId: number,
  nombrecompleto?: string,
  estado?: string,
  cedula?: string,
  curso?: string,
  checkeado?: boolean
}

export interface Persona{
  personaId: number,
  dni?: string,
  nombres?: string,
  apellidos?: string
}
