import { Catalogue } from "./catalogue";
import { Documents } from "./documents";
import { Institution } from "./institution";

export interface PersonCecy {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  genero: Catalogue;
  etnia: Catalogue;
  discapacidad: boolean;
  detallesDiscapacidad: string
  direccion: string;
  email: string;
  numeroCelular: string;
  numeroConvencional: string;
  nivelInstruccion: Catalogue;
  situacionEconomica: Catalogue; //agregar economia db
  empresaId: Institution;
  tipoEstudiante: Catalogue;
  //
  estado: boolean;
}
