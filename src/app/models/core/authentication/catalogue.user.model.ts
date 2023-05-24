export interface CatalogueUser {
  id: number;
  genders: Gender;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Gender {
  male = 'Masculino',
  female = 'Femenino',
}
