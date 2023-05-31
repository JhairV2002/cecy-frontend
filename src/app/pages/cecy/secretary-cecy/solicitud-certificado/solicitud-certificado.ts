export interface SolicitudCertificado{
  id: number,
  userId: number,
  courseId: number,
  tuitionId: number,
  estado: string,
  fecha?: Date,
  nombrecompleto?: string,
  cedula?: string,
  curso?: string,
  checkeado?: boolean
}
