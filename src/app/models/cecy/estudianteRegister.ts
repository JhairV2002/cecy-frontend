export interface EstudianteRegisterResponse {
  token: string;
  student: Student;
}

export interface Student {
  id: string;
  apellidos: string;
  cedula: string;
  detalleDiscapacidad: string;
  email: string;
  fechaNacimiento: string;
  nombres: string;
  numeroCelular: string;
  numeroConvencional: string;
  rol: string;
}
